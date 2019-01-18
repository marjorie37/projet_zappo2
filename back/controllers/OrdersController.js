const db = require(`../models/index.js`);
const moment = require("moment");
const { stripeRefundCharge, stripeCaptureCharge } = require("../lib/stripe");
const {
  emailValidatedOrder,
  emailFinishedOrder,
  emailCanceledOrder
} = require("../lib/listMailing");
const sequelize = require('sequelize');
const Op = sequelize.Op;


class OrdersController {
  /////////////////////////////////////////////
  //          Listing items from DBB         //
  /////////////////////////////////////////////

  orders(req, res) {
    db.orders
      .findAll({ 
        where: {
          pending_time: {
            [Op.lte]: moment().add(1, 'days').format(),
            [Op.gte]: new Date()
          }
        },
        include: [{ model: db.users }] 
      })
      .then(orders => {
        res.json(orders)
      });
  }

  order(req, res) {
    db.orders
      .findOne({
        where: { id: req.params.id },
        include: [{ model: db.users }]
      })
      .then(order => res.json(order));
  }

  /////////////////////////////////////////////
  //        Update of the items in DBB       //
  /////////////////////////////////////////////

  // 1. accept the order
  acceptOrder(req, res) {
    const { chargeId } = req.body;
    if (chargeId) {
      stripeCaptureCharge(chargeId).then(charge => {
        db.order_delay
          .findById("1")
          .then(delay => {
            db.orders

              .findById(req.params.id, {
                include: [{ model: db.users }]
              })
              .then(order => {
                const now = moment();
                order.validation_time = now.format();
                (order.pending_time = now.add(delay.time, "minutes").format()),
                (order.state = 1);
                order.save();
                const {user}=order;
                emailValidatedOrder(order,user);
                res.json({ success: "Commande actualisée avec succès \u{1F60A}"});
              })
              .catch(err => res.json({error:err.message}));
          })
          .catch(err => res.json({ error: err.message }));
      });
    }else{
      res.json({ error: "Aucune Paiement lié à cette commande" });
    }
    
  }
  // 2. cancel the order
  cancelOrder(req, res) {
    const { chargeId } = req.body;
    if (chargeId) {
      stripeRefundCharge(chargeId)
        .then(charge => {
          db.orders
            .findById(req.params.id, {include:[{model:db.users}]})
            .then(order => {
              order.state = 3;
              order.save();
              emailCanceledOrder(order.user, order.uid);
              res.json({ success: "Commande annulée" })
            })
            .catch(err => res.json({ error: err.message }));
        })
        .catch(err => res.json({ error: err.message }));
    }else{
      res.json({ error: "Aucun Paiement lié à cette commande" });
    }
  }
  // 3. finish the order
  finishOrder(req, res) {
    db.orders
      .findById(req.params.id, {
                include: [{ model: db.users }]
              })
      .then(order => {
        order.state = 2;
        order.save();
        const {user} = order;
        emailFinishedOrder(order,user);
        res.json({ success: "Commande terminée \u{1F60A}" })
      })
      .catch(err => res.json({ error: err.message }));
  }

  changeDelay(req, res) {
    db.order_delay
      .update(req.body, { where: { id: req.params.id } })
      .then(delay => res.json({ success: "done", delay }))
      .catch(err => res.json({ error: err.message }));
  }

  getDelay(req, res) {
    db.order_delay
      .findById(req.params.id)
      .then(delay => res.json({ success: delay.time }))
      .catch(err => res.json({ error: err.message }));
  }

  myAccount(req, res) {
    res.json(req.body.user);
  }
}

module.exports = OrdersController;
