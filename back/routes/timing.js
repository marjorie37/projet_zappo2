const express = require("express");
const router = express.Router();


/**
 * Routing for Exemples
 */
const ExempleController = require("../controllers/TimingController");
const controller = new ExempleController();

// route listant les articles

router.get("/", (req, res) =>
  controller.display(req, res)
);
router.get("/creer", (req, res) =>
  controller.create(req, res)
);
router.post("/creer", (req, res) =>
  controller.record(req, res)
);
router.get("/modifier/:id", (req, res) =>
  controller.modifier(req, res)
);
router.post("/enregistrer/:id", (req, res) => controller.enregistrer(req, res));
router.get("/fermeture", (req, res) => controller.fermeture(req, res));
router.post("/enregistrerFermeture", (req, res) => controller.enregistrerFermeture(req, res));
router.get("/modifierEx/:id",  (req, res) => controller.modifierEx(req, res));
router.post("/enregistrerEx/:id", (req, res) => controller.enregistrerEx(req, res));
router.get("/deleteEx/:id", (req, res) => controller.deleteEx(req, res));
router.get('/panic', (req, res) => controller.panic(req, res));
router.get("/update/:name/:id", (req, res) => controller.updateTime(req, res));








module.exports = router;