const db = require(`../models/index.js`);
const _ = require('lodash');
const { dateNow, localeToDate, timestampToLocale }= require('../lib/parseDate');
const moment = require('moment');
const sequelize = require('sequelize');
const Op = sequelize.Op;
/**
 * Class Admin Controller
 */
class DashboardController {
    /**
     * Exemple
     * @param {*} req
     * @param {*} res
     */
    dashboard(req, res) {
        
       
        async function dash() {
            const orders = await db.orders.findAll({
                where:{
                    pending_time:{
                        [Op.lte]:moment().add(1,'days').format(),
                        [Op.gte]: new Date()
                    }
                }
            }).then(results => {
                return results
            });
            let donnees;
            if(orders.length > 0){
                const users = await db.users.findAll().then(users => users);
                const todayUser = users.filter(elt => timestampToLocale(elt.createdAt) === dateNow());
                const CA = orders.reduce((acc, elt) => acc + elt.totalTTC, 0);
                const panier = CA / orders.length;
                const products = orders.map(elt => elt.cart.filter(el => el.category_id === 1));
                const pizza = _.flattenDeep(products).filter(elt => elt.category_id === 1);
                const nbPizza = pizza.map(el => el.quantity).reduce((ac, el) => ac + el, 0);
                donnees = {
                    panier: panier ? `${panier.toFixed(2)} €` : 0,
                    ca: CA > 0 ? `${CA.toFixed(2)} €` : "Aucune commande",
                    users: todayUser.length,
                    pizza: nbPizza
                };
            }else{
                donnees = null;
            }
            res.render("admin/dashboard", {
                donnees,
                user:req.user
            })
        }
        dash();
    }


    drawChart(req,res){

        db.orders.findAll({
            where: {
                pending_time: {
                    [Op.lte]: moment().add(1, 'days').format(),
                    [Op.gte]: new Date()
                }
            }
        }).then(results => {
            const products = results.map(el => el.cart);
            const quantity = _.flattenDeep(products)
                             .reduce((acc, el) => { acc[el.name] = el.quantity + acc[el.name] || el.quantity ; return acc},{})
            const topTen = Object.entries(quantity).sort((a, b) => b[1] - a[1]).slice(0, 5);
            const product = topTen.reduce((acc, el, i, tab) => acc[0]= tab.map(el => el[0]),[]);
            const data = topTen.reduce((acc, el, i, tab) => acc[0]= tab.map(el => el[1]), []);
            res.json({product,data})
        });
    }

}

module.exports = DashboardController;