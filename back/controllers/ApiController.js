const db = require(`../models/index.js`);
const { hashPassword } = require("../middlewares/bcryptPassword");
const { signToken, verifyToken } = require("../middlewares/jwt");
const path = require("path");
const {
  stripeCreateCustomer,
  stripeCreateCharge,
  stripeRetrieveCustomer,
  stripeUpdateCustomer
} = require("../lib/stripe");
const _ = require("lodash");
const { timeFormat, moment } = require("../lib/parseDate");
const {
  emailNewOrder,
  emailValidatedOrder,
  emailNewAccount,
  emailResetPassword
} = require("../lib/listMailing");
/**
 * Class UserAuthController
 */
class UserAuthController {
  /**
   * @param {*} req
   * @param {*} res
   */

  logout(req, res) {
    req.logout();
    res.redirect("/");
  }

  myAccount(req, res) {
    res.json(req.body.user);
  }

  customer(req, res) {
    db.users.findById(req.params.id).then(user => {
      res.json(user);
    });
  }

  subscribe(req, res) {
    db.users
      .findById(req.params.id)
      .then(user => {
        user.subscription ^= 1;
        user.save();
        res.json(user);
      })
      .catch(err => res.json({ error: err.message }));
  }

  order(req, res) {
    db.orders
      .findOne({ where: { id: req.params.id, user_id: req.params.uid } })
      .then(order => {
        res.json(order);
      })
      .catch(err => console.log(err));
  }

  ordersByCustomer(req, res) {
    db.orders
      .findAll({
        where: {
          user_id: req.params.id,
          $or: [{ state: 2 }, { state: 1 }]
        },
        include: [{ model: db.products }, { model: db.users }]
      })
      .then(orders => {
        res.json(orders);
      })
      .catch(err => console.log(err));
  }

  create(req, res) {
    const user = req.body;
    const currentUser = hashPassword(user, user.password);
    currentUser.then(newUser =>
      db.users
        .create(newUser)
        .then(dbUser => {
          const token = signToken(dbUser);
          const { email } = dbUser;
          stripeCreateCustomer({ email })
            .then(customer => {
              dbUser.customerId = customer.id;
              dbUser.save();
              emailNewAccount(dbUser);
              res.json({
                success: "done",
                token,
                user: verifyToken(token)
              });
            })
            .catch(err => res.json({ error: err.message }));
        })
        .catch(err => res.json({ error: err.message }))
    );
  }

  modify(req, res) {
    db.users.findById(req.params.id).then(user => {
      res.json(user);
    });
  }

  update(req, res) {
    const newUser = req.body;
    db.users.update(newUser, { where: { id: req.params.id } }).then(user => {
      res.json(user);
    });
  }

  delete(req, res) {
    db.users.findById(req.params.id).then(user => {
      user.update({ state: false }).then(() => {
        res.json({ success: "Compte Supprimé" });
      });
    });
  }

  lostPassword(req, res) {
    const user = req.user;
    res.render("user/lostPassword");
  }

  modifyPassword(req, res) {
    db.users
      .findOne({ where: { password: req.body.token } })
      .then(user => {
        const currentUser = hashPassword(user, req.body.password);
        currentUser
          .then(newUser => {
            const token = signToken(user);
            newUser.save();
            res.json({ success: "done", token, user: verifyToken(token) });
          })
          .catch(err => console.log(err));
      })
      .catch(err => res.json({ error: err.message }));
  }

  /**
   *SEND AN EMAIL WHEN THE RECOVER PASSWORD FORM IS SUBMITTED
   *
   * @param {*} req
   * @param {*} res
   * @memberof UserAuthController
   */
  changePassword(req, res) {
    db.users
      .findOne({ where: { email: req.body.email } })
      .then(user => {
        emailResetPassword(user);
        res.json({ success: "done" });
      })
      .catch(err => res.json({ error: err.message }));
  }

  products(req, res) {
    db.products
      .findAll({
        where: { state: true },
        include: [{ model: db.products, as: "associeProduit" }]
      })
      .then(resultats => {
        const results = _.groupBy(resultats, el => el.category_id);
        res.json(results);
      });
  }

  createOrder(req, res) {
    const {
      cart,
      dateOrder,
      dateNow,
      token,
      user,
      time,
      amount,
      amountHT,
      comments,
      points
    } = req.body;
    const [hours, minutes] = time.split(":");
    const newDate = moment(dateOrder)
      .hours(hours)
      .minutes(minutes);
    const day = newDate.format("dddd");
    db.timing
      .findOne({ where: { day } })
      .then(timing => {
        const {
          lunch_start_time: lunST,
          lunch_end_time: lunET,
          dinner_start_time: dinST,
          dinner_end_time: dinET
        } = timing;
        const checkTimeLunch = moment(newDate).isBetween(
          timeFormat(lunST),
          timeFormat(lunET)
        )
          ? "lunch"
          : null;
        const checkTimeDinner = moment(newDate).isBetween(
          timeFormat(dinST),
          timeFormat(dinET)
        )
          ? "dinner"
          : null;
        const checkTimeNowLunch = moment(dateNow).isBetween(
          timeFormat(lunST),
          timeFormat(lunET)
        )
          ? "lunch"
          : null;
        const checkTimeNowDinner = moment(dateNow).isBetween(
          timeFormat(dinST),
          timeFormat(dinET)
        )
          ? "dinner"
          : null;
        const lunchBool = [checkTimeLunch, checkTimeNowLunch].every(
          el => el === "lunch"
        );
        const dinnerBool = [checkTimeDinner, checkTimeNowDinner].every(
          el => el === "dinner"
        );
        const bool = moment(dateOrder).isAfter(dateNow, "day");
        db.users
          .findOne({ where: { id: user.id } })
          .then(user => {
            user.points += Number(points);
            user.save();
            stripeUpdateCustomer(user.customerId, { source: token.id })
              .then(customer => {
                const charge = {
                  amount,
                  currency: "eur",
                  customer: customer.id,
                  capture:
                    (bool === false && lunchBool) || dinnerBool ? false : true
                };
                stripeCreateCharge(charge)
                  .then(payment => {
                    db.order_delay
                      .findById("1")
                      .then(delay => {
                        const order = {
                          user_id: user.id,
                          comments,
                          state:
                            (bool === false && dinnerBool) || lunchBool ? 0 : 1,
                          cart: JSON.parse(cart),
                          totalTTC: amount / 100,
                          totalHT: amountHT,
                          chargeId: payment.id,
                          customerId: user.customerId,
                          validation_time:
                            (bool === false && dinnerBool) || lunchBool
                              ? null
                              : dateNow,
                          pending_time: newDate
                        };
                        db.orders
                          .create(order)
                          .then(order => {
                            const mailing =
                              (bool === false && lunchBool) || dinnerBool
                                ? emailNewOrder(user, order.uid)
                                : emailValidatedOrder(order, user, newDate);
                            if (mailing) {
                              res.json({
                                success: "done",
                                order
                              });
                            } else {
                              res.json({
                                success: "done",
                                order,
                                message: `Nous ne sommes pas parvenu à envoyer un email. Rendez-vous dans "Mon Compte" pour retouver la commande.`
                              });
                            }
                          })
                          .catch(err => console.log(err));
                      })
                      .catch(err => console.log(err));
                  })
                  .catch(err => console.log(err));
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  getTiming(req, res) {
    async function timing() {
      const timing = await db.timing
        .findAll()
        .then(dateTime => dateTime)
        .catch(err => console.log(err));
      const exceptTiming = await db.timing_exception
        .findAll()
        .then(exceptDateTime => exceptDateTime)
        .catch(err => console.log(err));
      const delay = await db.order_delay
        .findById(1)
        .then(delay => delay)
        .catch(err => console.log(err));
      res.json({
        timing,
        exceptTiming,
        delay
      });
    }
    timing();
  }

  sendFile(req, res) {
    res.sendFile(path.resolve("public") + `/uploads/${req.params.name}`);
  }

  checkmail(req, res) {
    const { email } = req.body;
    db.users
      .findOne({ where: { email } })
      .then(user => res.json({ success: "done", user }))
      .catch(err => res.json({ error: err.message }));
  }
}

module.exports = UserAuthController;
