const express = require("express");
const router = express.Router();

/**
 * Routing for Products
 */
const ProductsController = require("../controllers/ProductsController");
const controller = new ProductsController();

// Items listing
router.get("/", (req, res) => controller.products(req, res));

// Items listing for a category
router.get("/categorie/:category_id", (req, res) =>
  controller.productsByCategory(req, res)
);

// Items creation form
router.get("/ajouter", (req, res) =>
  controller.addProduct(req, res)
);

// Items editing form
router.get("/editer/:id", (req, res) => controller.editProduct(req, res));

// Creation of a new item
router.post("/add", (req, res) => controller.createProduct(req, res));

// Update of the item in database
router.post("/update/:id",(req, res) => controller.updateProduct(req, res));

// Toggle visibility of the item in database
router.get("/toggle-visibility/:id", (req, res) =>
  controller.toggleVisibility(req, res)
);

// Create allergene
router.get("/addallergene", (req, res) => controller.formAllergene(req, res));
router.post("/addallergene", (req, res) =>
  controller.createAllergene(req, res)
);

module.exports = router;
