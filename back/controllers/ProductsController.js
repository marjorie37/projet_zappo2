const db = require(`../models/index.js`);
const _ = require("lodash");

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
  fileFilter: function fileFilter(req, file, cb) {

    if(/image\/png|jpeg|jpg|svg/g.test(file.originalname)){
      cb(null, true)
    }
    cb(new Error('Fichiers acceptés png, jpeg,jpg,svg'))

  },
  limits:{
    fileSize: 1024 * 1024
  }
})
const upload = multer({ storage: storage }).single('uploadFile');


/**produits
 * Class Products Controller
 */
class ProductsController {
  /**
   * Exemple
   * @param {*} req
   * @param {*} res
   */
  products(req, res) {
    db.products
      .findAll({
        include: [{ model: db.category }]
      })
      .then(resultats => {
        const results = _.groupBy(resultats, element => {
          return element.sub_category;
        });
        res.render("products/productsList", { results });
      });
  }

  productsByCategory(req, res) {
    db.products
      .findAll({
        where: { category_id: req.params.category_id }
      })
      .then(resultats => {
        const results = _.groupBy(resultats, element => element.sub_category);
        res.render("products/productsList", { results });
      });
  }

  /////////////////////////////////////////////
  //         Adding a product in DB          //
  /////////////////////////////////////////////

  // Formulaire d'ajout de produit
  addProduct(req, res) {
    db.products
      .findAll({
        where: { category_id: 4 }
      })
      .then(productAssocie => {
        db.allergens.findAll().then(allergenes => {
          res.render("products/addProduct", { allergenes, productAssocie });
        });
      });
  }

  // Creation de l'entrée en base
  createProduct(req, res) {
    upload(req, res, function (err) {
      let { allergens,associate, ...product } = req.body;
      if (typeof allergens === "string") {
        allergens = [allergens];
      }
      if (err) {
        // An error occurred when uploading
        req.flash("error", err.message)
        res.redirect(`/admin/produits/ajouter`)
      }
      if (req.file) {
        product.url = req.file.filename;
      }
      db.products
        .create({ ...product, allergens })
        .then(product => {
          db.associateProduct.create({ product_id: product.id, associate_product_id: associate })
            .then(productAssocie => {
              req.flash("success", "Produit ajouté avec succès");
              res.redirect(`/admin/produits`);
            }).catch(err => console.log(err));
        });
    })
  }

  /////////////////////////////////////////////
  //        Update of the items in DBB       //
  /////////////////////////////////////////////

  // 1. formulaire
  editProduct(req, res) {
    db.products
      .findAll({
        where: { category_id: 4 }
      }).then(productAssocie =>{
        db.products.findById(req.params.id, { include: [{ model: db.products, as: "associeProduit" }] }).then(product => {
          const { associeProduit } = product;
          db.allergens.findAll().then(allergenes => {
            res.render("products/editProduct", { product, allergenes, productAssocie ,associate: associeProduit[0] });
          }).catch(err => console.log(err));
        }).catch(err => console.log(err));
      }).catch(err => console.log(err));
  }

  // 2. update of the database
  updateProduct(req, res) {
      upload(req, res, function (err) {
        let { allergens, associate,...product } = req.body;
        if (typeof allergens === "string") {
          allergens = [allergens];
        }
        if (err) {
          // An error occurred when uploading
          req.flash("error", err.message)
          res.redirect(`/admin/produits/editer/${req.params.id}`)
        }
        if (req.file) {
          product.url = req.file.filename;
        }
        db.associateProduct.findOne(
          {where:{product_id:req.params.id}})
        .then(productAssocie => {
          if(productAssocie !== null){
            productAssocie.destroy();
          }
          if(associate !== null){
            db.associateProduct.create({ product_id: req.params.id, associate_product_id: associate })
              .then(productAssocie => {
                updateProduct(product, allergens, req.params.id)
              }).catch(err => console.log(err));
          }
          updateProduct(product, allergens, req.params.id)
        }).catch(err => console.log(err))    
    })

    const updateProduct = (product, allergens,id) => {
      db.products
        .update({ ...product, allergens }, { where: {id } })
        .then(product => {
          req.flash("success", "Produit modifié avec succès");
          res.redirect(`/admin/produits/editer/${id}`);
        }).catch(err => console.log(err));
    }
  }

  // 3. toggle visibility of the product
  toggleVisibility(req, res) {
    db.products.findById(req.params.id).then(product => {
      req.flash(
        "success",
        product.state ? `${product.name} désactivé` : `${product.name} activé`
      );
      product.state ^= 1;
      product.save();
      res.redirect("/admin/produits");
    });
  }

  formAllergene(req, res) {
    res.render("products/createAllergene");
  }
  createAllergene(req, res) {
    db.allergens.create(req.body).then(allergen => {
      res.redirect("/admin/produits");
    });
  }
}

module.exports = ProductsController;
