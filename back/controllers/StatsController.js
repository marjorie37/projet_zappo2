const db = require(`../models/index.js`);
const moment = require("moment");
const _ = require("lodash");

class StatsController {
  stats(req, res) {
    const now = moment().format("YYYY-MM-DD");
    const year = moment().year();
    const tabl = [];
    tabl.push(year);

    for (let i = tabl[0]; i > 2018; i--) {
      tabl.push(i);
    }
    const annee = tabl.sort((a, b) => a - b);

    db.orders
      .findAll({
        where: {
          validation_time: {
            $ne: null
          }
        },

        include: [{ model: db.products }, { model: db.users }]
      })
      .then(stats => {
        const temps = stats.map(elt => {
          return {
            id: elt.id,
            cart: elt.cart,
            user: elt.user,
            validation_time: moment(elt.validation_time).format("YYYY-MM-DD"),
            totalTTC: elt.totalTTC,
            totalHT: elt.totalHT
          };
        });

        res.render("stats/statistiques", {
          date: now,
          annee,
          temps
        });
      });
  }

  jour(req, res) {
    const dateEntree = req.body.target_day.split(" ");

    const dateATester = dateEntree[0]
      .split("/")
      .join("-")
      .split("-")
      .reverse()
      .join("-");

    res.redirect(`/admin/statistiques/${dateATester}`);
  }

  mois(req, res) {
    const moisEntree = req.body.mounth;

    res.redirect(`/admin/statistiques/mois/${moisEntree}`);
  }

  mounth(req, res) {
    const now = moment().format("YYYY-MM-DD");
    const year = moment().year();
    const tabl = [];
    tabl.push(year);

    for (let i = tabl[0]; i > 2018; i--) {
      tabl.push(i);
    }
    const annee = tabl.sort((a, b) => a - b);

    const mounth = req.params.id.split(",").reverse();

    const tab = [
      "none",
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre"
    ];

    const final = tab[parseInt(mounth[1])];

    db.orders
      .findAll({ include: [{ model: db.products }, { model: db.users }] })
      .then(stats => {
        const result = stats.filter(elt => {
          if (elt.validation_time) {
            const triOne = moment(elt.validation_time)
              .format("YYYY-MM-DD")
              .split("-")
              .splice(0, 2);

            const comparaison = _.isEqual(triOne, mounth);

            return comparaison === true
              ? {
                  elt
                }
              : null;
          }
        });
        const filterByMounth = result.map(elt => {
          return {
            id: elt.id,
            cart: elt.cart,
            user: elt.user,
            validation_time: moment(elt.validation_time).format("YYYY-MM-DD"),
            totalTTC: elt.totalTTC,
            totalHT: elt.totalHT
          };
        });

        res.render("stats/statistiquesTrieMois", {
          filterByMounth,
          final,
          annee
        });
      });
  }

  day(req, res) {
    const now = moment().format("YYYY-MM-DD");
    const year = moment().year();
    const tabl = [];
    tabl.push(year);

    for (let i = tabl[0]; i > 2018; i--) {
      tabl.push(i);
    }
    const annee = tabl.sort((a, b) => a - b);

    const laDate = req.params.id;

    const datePresentation = laDate
      .split("-")
      .reverse()
      .join("-");

    db.orders
      .findAll({ include: [{ model: db.products }, { model: db.users }] })
      .then(stats => {
        const result = stats.filter(
          elt => moment(elt.validation_time).format("YYYY-MM-DD") === laDate
        );
        const filterByDay = result.map(elt => {
          return {
            id: elt.id,
            cart: elt.cart,
            user: elt.user,
            validation_time: moment(elt.validation_time).format("YYYY-MM-DD"),
            totalTTC: elt.totalTTC,
            totalHT: elt.totalHT
          };
        });

        res.render("stats/statistiquesTrie", {
          filterByDay,
          datePresentation,
          annee
        });
      });
  }
}

module.exports = StatsController;
