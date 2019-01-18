const express = require("express");
const router = express.Router();
const db = require(`../models/index.js`);

/**
 * Routing for
 */
const DiscountController = require("../controllers/DiscountController");
const controller = new DiscountController();

//discounts
router.get("/", (req, res) => controller.discount(req, res));
router.get("/create", (req, res) => controller.create(req, res));
router.get("/editer", (req, res) => controller.editer(req, res));
router.get("/categorie/:category_id", (req, res) =>
  controller.productsByCategory(req, res)
);
router.post("/create", (req, res) => controller.createcode(req, res));
router.get("/publier/:id", (req, res) => controller.publier(req, res));
router.post("/publier/:id", (req, res) => controller.send(req, res));
router.get("/detail/:id", (req, res) => controller.detail(req, res));
router.get("/supprimer/:id", (req, res) => controller.supprimer(req, res));

module.exports = router;
