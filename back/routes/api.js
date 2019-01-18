const express = require("express");
const router = express.Router();
const { signToken, verifyToken } = require("../middlewares/jwt");
const passport = require("passport");

/**
 * Routing for Exemples
 */
const ApiController = require("../controllers/ApiController");
const controller = new ApiController();

//USER API
router.use("/", (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth) {
    const token = auth.split("Bearer ")[1];
    const user = verifyToken(token);
    req.body.user = user;
  }
  next();
});

router.post("/connexion", (req,res) => {
  passport.authenticate("user",(err,user,info) => {
    if(err){
      res.json({
        error:err.message
      });
    }
    if(user){
      res.json({
        success: `Bienvenue ${user.name}`,
        token: signToken(user)
      });
    }else{
      res.json({
        ...info
      });
    }
  })(req, res)
})

router.get("/pictures/:name", (req, res) => controller.sendFile(req, res));
router.post("/deconnexion", (req, res) => controller.logout(req, res));
router.get("/creermoncompte", (req, res) => controller.register(req, res));
router.post("/creermoncompte", (req, res) => controller.create(req, res));
router.post("/moncompte", (req, res) => controller.myAccount(req, res));
router.post("/moncompte/supprimer/:id", (req, res) =>
  controller.delete(req, res)
);

router.get("/moncompte/modifier/:id", (req, res) => {
  controller.modify(req, res);
});

router.post("/checkmail", (req, res) => controller.checkmail(req, res));
router.post("/moncompte/modifier/:id", (req, res) =>
  controller.update(req, res)
);
router.post("/motdepasseperdu", (req, res) =>
  controller.changePassword(req, res)
);
router.post("/modify-motdepasseperdu", (req, res) =>
  controller.modifyPassword(req, res)
);
router.get("/supprimermoncompte/:id", (req, res) =>
  controller.delete(req, res)
);

router.get("/customers/orders/:id", (req, res) =>
  controller.ordersByCustomer(req, res)
);

router.get("/customers/:id", (req, res) => controller.customer(req, res));
router.get("/customers/subscription/:id", (req, res) =>
  controller.subscribe(req, res)
);

router.get("/order/:id/:uid", (req, res) => controller.order(req, res));

//TIMING API
router.get("/timing", (req, res) => controller.getTiming(req, res));

//PRODUCTS API
router.get("/products", (req, res) => controller.products(req, res));

//PAYEMENT WITH STRIPE
router.post("/payment", (req, res) => controller.createOrder(req, res));
module.exports = router;
