const express = require("express");
const router = express.Router();
const passport = require("passport");
const isAuthenticated = require("../middlewares/authenticated");

/**
 * Routing for Admin
 */
const AdminController = require("../controllers/AdminController");
const controller = new AdminController();

//admin login
router.get("/", (req, res) => controller.login(req, res));

//Middleware Authenticated
//router.use("/:all", isAuthenticated);

//admin manage staff
router.get("/manage/creer", (req, res) => controller.createstaff(req, res));
router.get("/manage", (req, res) => controller.liste(req, res));
router.get("/manage/supprimer/:id", (req, res) =>
  controller.supprimer(req, res)
);
router.get("/manage/toggleActive/:id", (req, res) =>
  controller.toggleActive(req, res)
);
router.post("/manage/creer", (req, res) => controller.registerstaff(req, res));

router.post(
  "/",
  passport.authenticate("admin", {
    successRedirect: "/admin/dashboard",
    failureRedirect: "/admin"
  })
);
router.get("/invoice", (req, res) => controller.invoice(req, res));

module.exports = router;
