const express = require("express");
const router = express.Router();

const StatsController = require("../controllers/StatsController");
const controller = new StatsController();

router.get("/", (req, res) => controller.stats(req, res));
router.post("/", (req, res) => controller.jour(req, res));
router.get("/:id", (req, res) => controller.day(req, res));
router.post("/mois", (req, res) => controller.mois(req, res));
router.get("/mois/:id", (req, res) => controller.mounth(req, res));

module.exports = router;
