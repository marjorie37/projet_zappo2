const db = require(`../models/index.js`);
const { dateNow } = require("../lib/parseDate");
/**
 * Class Exemple Controller
 */
class TimingController {
  /**
   * Exemple
   * @param {*} req
   * @param {*} res
   */

  display(req, res) {
    async function voir() {
      const resultats = await db.timing.findAll().then(resultats => resultats);
      const exceptions = await db.timing_exception
        .findAll()
        .then(exceptions => exceptions);
      res.render("admin/display", { resultats, exceptions });
    }
    voir();
  }

  create(req, res) {
    res.render("admin/createTime");
  }

  record(req, res) {
    db.timing.create(req.body).then(horaires => {
      res.redirect("/admin/reglages");
    });
  }
  modifier(req, res) {
    db.timing.findById(req.params.id).then(horaire => {
      res.render("admin/modifier", { horaire });
    });
  }
  enregistrer(req, res) {
    db.timing
      .update(req.body, { where: { id: req.params.id } })
      .then(horaire => {
        req.flash("success", "Horaires modifié avec succès");
        res.redirect("/admin/reglages");
      });
  }

  fermeture(req, res) {
    res.render("admin/fermeture", { date: dateNow() });
  }

  enregistrerFermeture(req, res) {
    db.timing_exception.create(req.body).then(horaires => {
      req.flash("success", "Nouvelle exception ajouté");
      res.redirect("/admin/reglages");
    });
  }

  modifierEx(req, res) {
    db.timing_exception.findById(req.params.id).then(timing => {
      res.render("admin/modifierEx", { timing });
    });
  }

  enregistrerEx(req, res) {
    let time = req.body;
    if (!time.shift_lunch) time.shift_lunch = false;
    if (!time.shift_dinner) time.shift_dinner = false;
    db.timing_exception
      .update(req.body, { where: { id: req.params.id } })
      .then(horaire => {
        req.flash("success", "Exception Modifié");
        res.redirect("/admin/reglages");
      });
  }

  deleteEx(req, res) {
    db.timing_exception.findById(req.params.id).then(horaire => {
      horaire.destroy();
      req.flash("Success", `Exceptions supprimé`);
      res.redirect("/admin/reglages");
    });
  }

  updateTime(req,res){
    console.log(req.body)
    db.timing.findById(req.params.id).then(time =>{
      time[req.params.name] ^=1;
      time.save();
      res.redirect("/admin/reglages");
    }).catch(err => console.log(err));
  }
}

module.exports = TimingController;
