const db = require(`../models/index.js`);
const _ = require("lodash");

/**
 * Class Discount Controller
 */
class DiscountController {
  /**
   * Exemple
   * @param {*} req
   * @param {*} res
   */
  discount(req, res) {
    db.discounts.findAll().then(discounts => {
      res.render("admin/manageDiscounts", { discounts });
    });
  }

  create(req, res) {
    const obj = {
      name: "hqgdhsqd",
      discount_items: {
        robert: "kezrkle",
        tuuyeury: "hskjhej",
        hgheg676: "hjkjdshfkj"
      },
      code: "RYFGH890"
    };
    // db.discounts.create(obj).then(promo => {
    //     res.send(promo)
    // });
    db.discounts.findAll().then(discounts => res.send(discounts));
  }

  editer(req, res) {
    db.category
      .findAll({ include: [{ model: db.products }] })
      .then(category => {
        res.render("admin/editerDiscount", { category });
      });
  }
  createcode(req, res) {
    const { checkDiscounts, ...promo } = req.body;
    const promotion = {
      ...promo,
      discount_items: { products: checkDiscounts }
    };
    db.discounts
      .create(promotion)
      .then(promo => res.redirect("/admin/promotions"));
  }

  publier(req, res) {
    db.discounts.findById(req.params.id).then(discounts => {
      const produits = discounts.discount_items.products;
      res.render("admin/publishDiscount", { discounts });
    });
  }

  supprimer(req, res) {
    db.discounts.findById(req.params.id).then(discount => {
      discount.destroy().then(discount => {
        req.flash("success", `Promotion n° ${discount.code} supprimée`);
        res.redirect("/admin/promotions");
      });
    });
  }
  send(req, res) {
    db.discounts.findById(req.params.id).then(discount => {
      discount.update(req.body).then(discount => res.json(discount));
    });
  }

  detail(req, res) {
    db.discounts.findById(req.params.id).then(discounts => {
      res.render("admin/detailDiscount", { discounts });
    });
  }
}

module.exports = DiscountController;
