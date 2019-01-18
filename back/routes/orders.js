const express = require("express");
const router = express.Router();
const passport = require("passport");
const { signToken, verifyToken } = require("../middlewares/jwt");

/**
 * Routing for Orders
 */
const OrdersController = require("../controllers/OrdersController");
const controller = new OrdersController();


router.use("/", (req, res, next) => {
  const auth = req.headers.authorization;

  if (auth) {
    const token = auth.split("Bearer ")[1];
    const user = verifyToken(token);
    req.body.user = user;
  }
  next();
});


// route listant les articles
router.get("/", (req, res) => controller.orders(req, res));
router.get("/:id", (req, res) => controller.order(req, res));

router.post("/valider/:id", (req, res) => controller.acceptOrder(req, res));
router.post("/annuler/:id", (req, res) =>
  controller.cancelOrder(req, res)
);
router.post("/terminer/:id", (req, res) =>
  controller.finishOrder(req, res)
);


router.post("/connexion", (req, res) => {
  passport.authenticate("staff", (err, user, info) => {
    if (err) {
      res.json({
        error: err.message
      });
    }
    if (user) {
      res.json({
        success: `Bienvenue ${user.name}`,
        token: signToken(user)
      });
    } else {
      res.json({
        ...info
      });
    }
  })(req, res)
})

router.get("/orderdelay/:id", (req, res) =>
  controller.getDelay(req, res)
);
router.post("/orderdelay/:id", (req, res) =>
  controller.changeDelay(req, res)
);

router.post("/moncompte", (req, res) =>
  controller.myAccount(req, res)
);


module.exports = router;
