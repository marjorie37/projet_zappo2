const db = require(`../models/index.js`);
const { hashPassword } = require(`../middlewares/bcryptPassword`);

/**
 * Class Admin Controller
 */
class AdminController {
  /**
   * Exemple
   * @param {*} req
   * @param {*} res
   */
  //Connexion à la session
  login(req, res) {
    res.render("admin/login");
  }

  createstaff(req, res) {
    res.render("admin/createstaff");
  }

  registerstaff(req, res) {
    const { password } = req.body;
    const { confirmPassword, ...currentUser } = req.body;
    if (password !== confirmPassword) {
      req.flash("error", `Vos Mots de passe ne sont pas identique`);
      res.redirect("/admin/manage/creer");
    }
    const user = hashPassword(currentUser, password);
    user.then(user =>
      db.staff.create(user).then(user => {
        req.flash("success", `Compte ${user.name} ajouté`);
        res.redirect("/admin/manage");
      })
    );
  }

  liste(req, res) {
    db.staff.findAll().then(staff => {
      res.render("admin/liste", {
        staff
      });
    });
  }
  supprimer(req, res) {
    db.staff.findById(req.params.id).then(staff => {
      staff.destroy().then(staff => {
        req.flash("success", `Compte de ${staff.name} supprimé`);
        res.redirect("/admin/manage");
      });
    });
  }
  toggleActive(req, res) {
    db.staff.findById(req.params.id).then(user => {
      req.flash(
        "success",
        user.state
          ? `Compte de ${user.name} désactivé`
          : `Compte de ${user.name} activé`
      );
      user.state ^= 1;
      user.save();
      res.redirect("/admin/manage");
    });
  }
  invoice(req, res) {
    res.render("admin/invoice");
  }
}

module.exports = AdminController;
