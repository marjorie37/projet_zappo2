const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();
const db = require(`../models/index.js`);
let mail = [];

router.get("/mail", (req, res) =>
  db.users.findAll().then(discounts => {
    const test = discounts.map(elt => {

      mail.push(elt.email);
    });

    res.json(mail);
    for (let i = 0; i < mail.length; i++) {
      const element = mail[i];
    }
  })
);

const numerocommande = 1234;
const nomduclient = "Jean claude Dus";
const heurecommande = "19H30";
const adresseclient = "17 rue delandine 69002 Lyon";
const telephoneclient = "0678925164";
const quantite = 2;
const nomproduit = "pizza zappo";
const prix = 19;
const totalcommande = quantite * prix;
const titrepromotion = "Coupe du monde";
const descriptionpromotion =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam provident eum ad, voluptates asperiores nam quibusdam, maxime adipisci omnis eaque error consequatur. Ad necessitatibus aliquam exercitationem et sequi libero explicabo?";
const codePromotion = "CDM20";
const dateFinPromo = "14 juillet 2018";
const nombrePointFidelite = 3;
const fidelitePizzaGratuit = 7;

const header = `<div style="margin-top:5%;padding: 1.5rem; background-color: rgb(44, 61, 78);box-shadow: 10px 6px 6px 1px rgba(0, 0, 0, 0.6)">
        <div style="text-align: center;margin-right: 1.5rem;margin: auto; ">
            <img src="   data:image/png;base64,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 "
            />
        </div>
    </div>`;

const commandeRecu = ` <body style="background-image:url( data:image/gif;base64,R0lGODlhXQCdAMQAAAAAAP///+Xn6MTa5Nbh5tni5r7Y48HZ48bb5Mnc5M7e5dDf5d3k5+Dl58vd5NPg5dvj5uPm5+jo6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAXQCdAAAF/6CRMFJpnmiqrurzsHAsS8Ug1Ekx77vL/7DaQFcSEoHIki+JvA0SEJWRCVxSZ4LHYRQrIIaCq8wqXmW3pB0jcXiEy60XPHXmItft91wp30siWgppVHhufmRlEQoGChF7DQoHjXOIVIqMjn4ll5NilUicmZonoVefPJAHC6KjKYqSDUynMoV6rSx1gzyzLLW3PLk/vCm+v0DBM8MmEAkDBLbGxzUIRyzKU9Fw2Cu829lz3ien4d97XmAoldPV5a3FElbI7dm+PvLz5YULC1p2+P8NHBgQoevfvDMHBkhiZTBbKBelGhqLuCSiRD+pOvE5ce8iITaG0vUx0dEjj3cizf/0i2JyR4Fmz2AMI9fyBM0UymgMGFITxc04PM7FNJnlCctdI2egxFcyWVI1IKFla9rj6clIGicuUhDLlNUfFkeFpZJTxtgykDDtKTsDEBo4S8uw3UFVadRWc4GtBPJyQEi8X8HtZLfi59rA5gazMHwIsZ9zBfQUzTEvr5haC97is1wGj4GC7TjDNSBRNBzSDU2XQW1QtRjW/1xfgb3ZsTHalW3/wh1a9y3e5WRTAf5NOBPi2YwnQR5NORLmxpwDgf5L+g/qt6zzwA5YIvdR2nd81xR+xvjG3kv7bnX+cPrU60e1pxRf03w45WXcl1vfz35P/e3xn1fvtRbgHAOSdeD/aeoVGNuCqzXYUIKyQPhaQwI44IBU5VAIViB34eNhW1tlEtdt5ZzFgAN5dOhQiTCcJZ8xqayyg4wC3nJiDDhGqMmONwYCmo9zAHlMP0MONwczznAoRl3TlcFYGZMdpSQVUz6m2JVIZNmKlymct45JYJrAHZT/MPmXflgg2RMKRpoZA5otxUncGQ4k+eYJK7bB0Am89binKzCGiYKgg64wFmuIJhpjoRKQ9kpWjjLhVp6RhlgpHHUYcICem1JBwEBuhirlTguQRqepKghAwADUSMAAa5MRxqpKmsmKW5mJdjRrYVveakIEmQmiwq+LNbPmpj0iC0OcHiHqbAzQ/tPn/wN/HvtdWpRKVG0J094IqUHfmhAuD5x0NQ+v5u63qjbBJnFuE6W24kSsl1FYpSbv0jKiTjxRWe9oX8YLBLGSgMrEvODA5KSi4/rB8B7QNnrFxBJrCieL2NLzLwwZsVJuvviEMnJnH5NoQMD4YByNPy2nvAPM87hsDM3t2PwLzvnIPAPP3+h8C9AeS0R0NEK3crQxSY+y9C9Na/K0jj7LMLU7Vcdw9ShR+7H1j1nD8LXEYbMwNsVlr3B2kWmrsDbBDb2NstEKQ912CnKTHHfdVNPdUNd75H3x3SgITgjhJxi+MOImKC4v4yU4fgfkEkgOBOBzWP4D5nBofhLlnqsBOgbfWPtNbggAOw==);color: rgb(44, 61, 78); font-family: sans-serif;
    margin: auto; width: 80%;margin-bottom: 3rem">
        <div style="margin: 1.3rem;margin-top:4rem ; ">
            <h3 style="text-align: center">Bonjour ${nomduclient}</h3>
            <div style="box-shadow: 10px 6px 6px 1px rgba(0, 0, 0, 0.6);width: 100%;height: 100px;background-color: rgb(44, 61, 78);  ">
                <h1 style="color:azure;position:relative;top:25%;padding-left: 2rem">Commande en cours</h1>
            </div>
            <div style="background:azure;padding: 2rem;box-shadow: 10px 6px 6px 1px rgba(0, 0, 0, 0.6)">
                <div>
                    <p>Commande numéro : ${numerocommande}</p>
                </div>
                <div>
                    <p>Votre commande est actuellement en cours de traitement, un e-mail et un sms vous seront envoyé dans quelques
                        minutes lorsqu’elle aura été accepté par notre équipe.
                    </p>
                    <p>Merci, L'équipe de Zappo</p>
                </div>
            </div>
        </body>`;
const commandeValide = `<body style="background-image:url( data:image/gif;base64,R0lGODlhXQCdAMQAAAAAAP///+Xn6MTa5Nbh5tni5r7Y48HZ48bb5Mnc5M7e5dDf5d3k5+Dl58vd5NPg5dvj5uPm5+jo6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAXQCdAAAF/6CRMFJpnmiqrurzsHAsS8Ug1Ekx77vL/7DaQFcSEoHIki+JvA0SEJWRCVxSZ4LHYRQrIIaCq8wqXmW3pB0jcXiEy60XPHXmItft91wp30siWgppVHhufmRlEQoGChF7DQoHjXOIVIqMjn4ll5NilUicmZonoVefPJAHC6KjKYqSDUynMoV6rSx1gzyzLLW3PLk/vCm+v0DBM8MmEAkDBLbGxzUIRyzKU9Fw2Cu829lz3ien4d97XmAoldPV5a3FElbI7dm+PvLz5YULC1p2+P8NHBgQoevfvDMHBkhiZTBbKBelGhqLuCSiRD+pOvE5ce8iITaG0vUx0dEjj3cizf/0i2JyR4Fmz2AMI9fyBM0UymgMGFITxc04PM7FNJnlCctdI2egxFcyWVI1IKFla9rj6clIGicuUhDLlNUfFkeFpZJTxtgykDDtKTsDEBo4S8uw3UFVadRWc4GtBPJyQEi8X8HtZLfi59rA5gazMHwIsZ9zBfQUzTEvr5haC97is1wGj4GC7TjDNSBRNBzSDU2XQW1QtRjW/1xfgb3ZsTHalW3/wh1a9y3e5WRTAf5NOBPi2YwnQR5NORLmxpwDgf5L+g/qt6zzwA5YIvdR2nd81xR+xvjG3kv7bnX+cPrU60e1pxRf03w45WXcl1vfz35P/e3xn1fvtRbgHAOSdeD/aeoVGNuCqzXYUIKyQPhaQwI44IBU5VAIViB34eNhW1tlEtdt5ZzFgAN5dOhQiTCcJZ8xqayyg4wC3nJiDDhGqMmONwYCmo9zAHlMP0MONwczznAoRl3TlcFYGZMdpSQVUz6m2JVIZNmKlymct45JYJrAHZT/MPmXflgg2RMKRpoZA5otxUncGQ4k+eYJK7bB0Am89binKzCGiYKgg64wFmuIJhpjoRKQ9kpWjjLhVp6RhlgpHHUYcICem1JBwEBuhirlTguQRqepKghAwADUSMAAa5MRxqpKmsmKW5mJdjRrYVveakIEmQmiwq+LNbPmpj0iC0OcHiHqbAzQ/tPn/wN/HvtdWpRKVG0J094IqUHfmhAuD5x0NQ+v5u63qjbBJnFuE6W24kSsl1FYpSbv0jKiTjxRWe9oX8YLBLGSgMrEvODA5KSi4/rB8B7QNnrFxBJrCieL2NLzLwwZsVJuvviEMnJnH5NoQMD4YByNPy2nvAPM87hsDM3t2PwLzvnIPAPP3+h8C9AeS0R0NEK3crQxSY+y9C9Na/K0jj7LMLU7Vcdw9ShR+7H1j1nD8LXEYbMwNsVlr3B2kWmrsDbBDb2NstEKQ912CnKTHHfdVNPdUNd75H3x3SgITgjhJxi+MOImKC4v4yU4fgfkEkgOBOBzWP4D5nBofhLlnqsBOgbfWPtNbggAOw==);color: rgb(44, 61, 78); font-family: sans-serif;
    margin: auto; width: 80%;margin-bottom: 3rem">
        <div style="margin: 1.3rem;margin-top:4rem ; ">
            <h3 style="text-align: center">Bonjour ${nomduclient}</h3>
            <div style="box-shadow: 10px 6px 6px 1px rgba(0, 0, 0, 0.6);width: 100%;height: 100px;background-color: rgb(44, 61, 78);  ">
                <h1 style="color:azure;position:relative;top:25%;padding-left: 2rem">Commande en cours</h1>
            </div>
            <div style="background:azure;padding: 2rem;box-shadow: 10px 6px 6px 1px rgba(0, 0, 0, 0.6)">
                <div>
                    <p>Commande numéro : ${numerocommande}</p>
                </div>
                 <div>
                    <h1 style="text-align:center;margin-top: 3.5rem; margin-bottom: 3.5rem">Votre commande a été accepté</h1>
                    <h3 style="margin-bottom: 2rem">Vous pouvez venir retirer votre commande dans notre restaurant à partir de ${heurecommande}. Bon appétit
                        !
                    </h3>
                    <button style="margin-bottom:2rem;margin-left: auto; background-color: rgb(44, 61, 78);
    border: none;
    color: azure;
    width: 100%;
    padding: 0;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    border-radius: 5px;
 box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
 font-size: 16px;">
                        <h2>Voir votre commande</h2>
                    </button>
                    <div style="border-top: 2px solid rgb(44, 61, 78);width: 100%;overflow: scroll;">
                        <div style="text-align: center">
                            <h2>Commande #${numerocommande}</h2>
                        </div>
                        <div style="float: left">
                            <p>Zappo,
                                <br/> 6 Rue Challemel Lacour,
                                <br/> 69007 Lyon</p>

                        </div>
                        <div style="float: right">
                            <p>${nomduclient}
                                <br/> ${adresseclient}
                                <br/> ${telephoneclient}</p>
                        </div>

                    </div>
                    <div style="overflow: scroll">
                        <table style="overflow: scroll; text-align: center; margin-top:1.4rem;width: 100%;">
                            <tr>

                                <td style="width: 33%;">
                                    <h3>${quantite}</h3>
                                </td>
                                <td style="width: 33%">
                                    <h3>${nomproduit}</h3>
                                </td>
                                <td style="width: 33%">
                                    <h3>${prix} €</h3>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h1>Total</h1>
                                </td>
                                <td></td>
                                <td colspan="2">
                                    <h1>${totalcommande} €</h1>
                                </td>
                            </tr>

                        </table>
                    </div>
                    <div style="position: relative;bottom: 0px">
                        <p>Merci, L'équipe de Zappo</p>
                    </div>

                </div>
            </div>
        </body>`;
const commandeTermine = `<body style="background-image:url( data:image/gif;base64,R0lGODlhXQCdAMQAAAAAAP///+Xn6MTa5Nbh5tni5r7Y48HZ48bb5Mnc5M7e5dDf5d3k5+Dl58vd5NPg5dvj5uPm5+jo6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAXQCdAAAF/6CRMFJpnmiqrurzsHAsS8Ug1Ekx77vL/7DaQFcSEoHIki+JvA0SEJWRCVxSZ4LHYRQrIIaCq8wqXmW3pB0jcXiEy60XPHXmItft91wp30siWgppVHhufmRlEQoGChF7DQoHjXOIVIqMjn4ll5NilUicmZonoVefPJAHC6KjKYqSDUynMoV6rSx1gzyzLLW3PLk/vCm+v0DBM8MmEAkDBLbGxzUIRyzKU9Fw2Cu829lz3ien4d97XmAoldPV5a3FElbI7dm+PvLz5YULC1p2+P8NHBgQoevfvDMHBkhiZTBbKBelGhqLuCSiRD+pOvE5ce8iITaG0vUx0dEjj3cizf/0i2JyR4Fmz2AMI9fyBM0UymgMGFITxc04PM7FNJnlCctdI2egxFcyWVI1IKFla9rj6clIGicuUhDLlNUfFkeFpZJTxtgykDDtKTsDEBo4S8uw3UFVadRWc4GtBPJyQEi8X8HtZLfi59rA5gazMHwIsZ9zBfQUzTEvr5haC97is1wGj4GC7TjDNSBRNBzSDU2XQW1QtRjW/1xfgb3ZsTHalW3/wh1a9y3e5WRTAf5NOBPi2YwnQR5NORLmxpwDgf5L+g/qt6zzwA5YIvdR2nd81xR+xvjG3kv7bnX+cPrU60e1pxRf03w45WXcl1vfz35P/e3xn1fvtRbgHAOSdeD/aeoVGNuCqzXYUIKyQPhaQwI44IBU5VAIViB34eNhW1tlEtdt5ZzFgAN5dOhQiTCcJZ8xqayyg4wC3nJiDDhGqMmONwYCmo9zAHlMP0MONwczznAoRl3TlcFYGZMdpSQVUz6m2JVIZNmKlymct45JYJrAHZT/MPmXflgg2RMKRpoZA5otxUncGQ4k+eYJK7bB0Am89binKzCGiYKgg64wFmuIJhpjoRKQ9kpWjjLhVp6RhlgpHHUYcICem1JBwEBuhirlTguQRqepKghAwADUSMAAa5MRxqpKmsmKW5mJdjRrYVveakIEmQmiwq+LNbPmpj0iC0OcHiHqbAzQ/tPn/wN/HvtdWpRKVG0J094IqUHfmhAuD5x0NQ+v5u63qjbBJnFuE6W24kSsl1FYpSbv0jKiTjxRWe9oX8YLBLGSgMrEvODA5KSi4/rB8B7QNnrFxBJrCieL2NLzLwwZsVJuvviEMnJnH5NoQMD4YByNPy2nvAPM87hsDM3t2PwLzvnIPAPP3+h8C9AeS0R0NEK3crQxSY+y9C9Na/K0jj7LMLU7Vcdw9ShR+7H1j1nD8LXEYbMwNsVlr3B2kWmrsDbBDb2NstEKQ912CnKTHHfdVNPdUNd75H3x3SgITgjhJxi+MOImKC4v4yU4fgfkEkgOBOBzWP4D5nBofhLlnqsBOgbfWPtNbggAOw==);color: rgb(44, 61, 78); font-family: sans-serif;
    margin: auto; width: 80%;margin-bottom: 3rem">
        <div style="margin: 1.3rem;margin-top:4rem ; ">
            <h3 style="text-align: center">Bonjour ${nomduclient}</h3>
            <div style="box-shadow: 10px 6px 6px 1px rgba(0, 0, 0, 0.6);width: 100%;height: 100px;background-color: rgb(44, 61, 78);  ">
                <h1 style="color:azure;position:relative;top:25%;padding-left: 2rem">Commande terminé</h1>
            </div>
            <div style="background:azure;padding: 2rem;box-shadow: 10px 6px 6px 1px rgba(0, 0, 0, 0.6)">
                <div>
                    <p>Commande numéro : ${numerocommande}</p>
                </div>
                 <div>
                    <h1 style="text-align:center;margin-top: 3.5rem; margin-bottom: 3.5rem">Nous vous remercions<br/> pour votre commande !</h1>
                    <h3>${nombrePointFidelite} points de fidélité gagné !</h3>
                    <h5>Plus que ${fidelitePizzaGratuit} points pour une pizza gratuite. </h5>
                    
                    <button style="margin-bottom:2rem;margin-left: auto; background-color: rgb(44, 61, 78);
    border: none;
    color: azure;
    width: 100%;
    padding: 0;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    border-radius: 5px;
 box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
 font-size: 16px;">
                        <h2>Voir votre commande</h2>
                    </button>
                    <div style="border-top: 2px solid rgb(44, 61, 78);width: 100%;overflow: scroll;">
                        <div style="text-align: center">
                            <h2>Commande #${numerocommande}</h2>
                        </div>
                        <div style="float: left">
                            <p>Zappo,
                                <br/> 6 Rue Challemel Lacour,
                                <br/> 69007 Lyon</p>

                        </div>
                        <div style="float: right">
                            <p>${nomduclient}
                                <br/> ${adresseclient}
                                <br/> ${telephoneclient}</p>
                        </div>

                    </div>
                    <div style="overflow: scroll">
                        <table style="overflow: scroll; text-align: center; margin-top:1.4rem;width: 100%;">
                            <tr>

                                <td style="width: 33%;">
                                    <h3>${quantite}</h3>
                                </td>
                                <td style="width: 33%">
                                    <h3>${nomproduit}</h3>
                                </td>
                                <td style="width: 33%">
                                    <h3>${prix} €</h3>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h1>Total</h1>
                                </td>
                                <td></td>
                                <td colspan="2">
                                    <h1>${totalcommande} €</h1>
                                </td>
                            </tr>

                        </table>
                    </div>
                    <div style="position: relative;bottom: 0px">
                        <p>Merci, L'équipe de Zappo</p>
                    </div>

                </div>
            </div>
        </body>`;
const commandeRefuse = ` <body style="background-image:url( data:image/gif;base64,R0lGODlhXQCdAMQAAAAAAP///+Xn6MTa5Nbh5tni5r7Y48HZ48bb5Mnc5M7e5dDf5d3k5+Dl58vd5NPg5dvj5uPm5+jo6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAXQCdAAAF/6CRMFJpnmiqrurzsHAsS8Ug1Ekx77vL/7DaQFcSEoHIki+JvA0SEJWRCVxSZ4LHYRQrIIaCq8wqXmW3pB0jcXiEy60XPHXmItft91wp30siWgppVHhufmRlEQoGChF7DQoHjXOIVIqMjn4ll5NilUicmZonoVefPJAHC6KjKYqSDUynMoV6rSx1gzyzLLW3PLk/vCm+v0DBM8MmEAkDBLbGxzUIRyzKU9Fw2Cu829lz3ien4d97XmAoldPV5a3FElbI7dm+PvLz5YULC1p2+P8NHBgQoevfvDMHBkhiZTBbKBelGhqLuCSiRD+pOvE5ce8iITaG0vUx0dEjj3cizf/0i2JyR4Fmz2AMI9fyBM0UymgMGFITxc04PM7FNJnlCctdI2egxFcyWVI1IKFla9rj6clIGicuUhDLlNUfFkeFpZJTxtgykDDtKTsDEBo4S8uw3UFVadRWc4GtBPJyQEi8X8HtZLfi59rA5gazMHwIsZ9zBfQUzTEvr5haC97is1wGj4GC7TjDNSBRNBzSDU2XQW1QtRjW/1xfgb3ZsTHalW3/wh1a9y3e5WRTAf5NOBPi2YwnQR5NORLmxpwDgf5L+g/qt6zzwA5YIvdR2nd81xR+xvjG3kv7bnX+cPrU60e1pxRf03w45WXcl1vfz35P/e3xn1fvtRbgHAOSdeD/aeoVGNuCqzXYUIKyQPhaQwI44IBU5VAIViB34eNhW1tlEtdt5ZzFgAN5dOhQiTCcJZ8xqayyg4wC3nJiDDhGqMmONwYCmo9zAHlMP0MONwczznAoRl3TlcFYGZMdpSQVUz6m2JVIZNmKlymct45JYJrAHZT/MPmXflgg2RMKRpoZA5otxUncGQ4k+eYJK7bB0Am89binKzCGiYKgg64wFmuIJhpjoRKQ9kpWjjLhVp6RhlgpHHUYcICem1JBwEBuhirlTguQRqepKghAwADUSMAAa5MRxqpKmsmKW5mJdjRrYVveakIEmQmiwq+LNbPmpj0iC0OcHiHqbAzQ/tPn/wN/HvtdWpRKVG0J094IqUHfmhAuD5x0NQ+v5u63qjbBJnFuE6W24kSsl1FYpSbv0jKiTjxRWe9oX8YLBLGSgMrEvODA5KSi4/rB8B7QNnrFxBJrCieL2NLzLwwZsVJuvviEMnJnH5NoQMD4YByNPy2nvAPM87hsDM3t2PwLzvnIPAPP3+h8C9AeS0R0NEK3crQxSY+y9C9Na/K0jj7LMLU7Vcdw9ShR+7H1j1nD8LXEYbMwNsVlr3B2kWmrsDbBDb2NstEKQ912CnKTHHfdVNPdUNd75H3x3SgITgjhJxi+MOImKC4v4yU4fgfkEkgOBOBzWP4D5nBofhLlnqsBOgbfWPtNbggAOw==);color: rgb(44, 61, 78); font-family: sans-serif;
    margin: auto; width: 80%;margin-bottom: 3rem">
        <div style="margin: 1.3rem;margin-top:4rem ; ">
            <h3 style="text-align: center">Bonjour ${nomduclient}</h3>
            <div style="box-shadow: 10px 6px 6px 1px rgba(0, 0, 0, 0.6);width: 100%;height: 100px;background-color: rgb(44, 61, 78);  ">
                <h1 style="color:azure;position:relative;top:25%;padding-left: 2rem">Commande refusé</h1>
            </div>
            <div style="background:azure;padding: 2rem;box-shadow: 10px 6px 6px 1px rgba(0, 0, 0, 0.6)">
                <div>
                    <p>Commande numéro : ${numerocommande}</p>
                </div>
            <div>
                    <p>Nous sommes au regret de ne pas pouvoir donner suite à votre commande.
                    </p>
                    <p>Merci, L'équipe de Zappo</p>
                </div>
            </div>
        </body>`;
const codePromo = `<body style="background-image:url( data:image/gif;base64,R0lGODlhXQCdAMQAAAAAAP///+Xn6MTa5Nbh5tni5r7Y48HZ48bb5Mnc5M7e5dDf5d3k5+Dl58vd5NPg5dvj5uPm5+jo6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAXQCdAAAF/6CRMFJpnmiqrurzsHAsS8Ug1Ekx77vL/7DaQFcSEoHIki+JvA0SEJWRCVxSZ4LHYRQrIIaCq8wqXmW3pB0jcXiEy60XPHXmItft91wp30siWgppVHhufmRlEQoGChF7DQoHjXOIVIqMjn4ll5NilUicmZonoVefPJAHC6KjKYqSDUynMoV6rSx1gzyzLLW3PLk/vCm+v0DBM8MmEAkDBLbGxzUIRyzKU9Fw2Cu829lz3ien4d97XmAoldPV5a3FElbI7dm+PvLz5YULC1p2+P8NHBgQoevfvDMHBkhiZTBbKBelGhqLuCSiRD+pOvE5ce8iITaG0vUx0dEjj3cizf/0i2JyR4Fmz2AMI9fyBM0UymgMGFITxc04PM7FNJnlCctdI2egxFcyWVI1IKFla9rj6clIGicuUhDLlNUfFkeFpZJTxtgykDDtKTsDEBo4S8uw3UFVadRWc4GtBPJyQEi8X8HtZLfi59rA5gazMHwIsZ9zBfQUzTEvr5haC97is1wGj4GC7TjDNSBRNBzSDU2XQW1QtRjW/1xfgb3ZsTHalW3/wh1a9y3e5WRTAf5NOBPi2YwnQR5NORLmxpwDgf5L+g/qt6zzwA5YIvdR2nd81xR+xvjG3kv7bnX+cPrU60e1pxRf03w45WXcl1vfz35P/e3xn1fvtRbgHAOSdeD/aeoVGNuCqzXYUIKyQPhaQwI44IBU5VAIViB34eNhW1tlEtdt5ZzFgAN5dOhQiTCcJZ8xqayyg4wC3nJiDDhGqMmONwYCmo9zAHlMP0MONwczznAoRl3TlcFYGZMdpSQVUz6m2JVIZNmKlymct45JYJrAHZT/MPmXflgg2RMKRpoZA5otxUncGQ4k+eYJK7bB0Am89binKzCGiYKgg64wFmuIJhpjoRKQ9kpWjjLhVp6RhlgpHHUYcICem1JBwEBuhirlTguQRqepKghAwADUSMAAa5MRxqpKmsmKW5mJdjRrYVveakIEmQmiwq+LNbPmpj0iC0OcHiHqbAzQ/tPn/wN/HvtdWpRKVG0J094IqUHfmhAuD5x0NQ+v5u63qjbBJnFuE6W24kSsl1FYpSbv0jKiTjxRWe9oX8YLBLGSgMrEvODA5KSi4/rB8B7QNnrFxBJrCieL2NLzLwwZsVJuvviEMnJnH5NoQMD4YByNPy2nvAPM87hsDM3t2PwLzvnIPAPP3+h8C9AeS0R0NEK3crQxSY+y9C9Na/K0jj7LMLU7Vcdw9ShR+7H1j1nD8LXEYbMwNsVlr3B2kWmrsDbBDb2NstEKQ912CnKTHHfdVNPdUNd75H3x3SgITgjhJxi+MOImKC4v4yU4fgfkEkgOBOBzWP4D5nBofhLlnqsBOgbfWPtNbggAOw==);color: rgb(44, 61, 78); font-family: sans-serif;
    margin: auto; width: 80%;margin-bottom: 3rem">
        <div style="padding: 1.3rem ">
            <h3 style="text-align: center">Bonjour ${nomduclient}</h3>
            <div style="box-shadow: 10px 6px 6px 1px rgba(0, 0, 0, 0.6);width: 100%;height: 100px;background-color: rgb(44, 61, 78);  ">
                <h1 style="color:azure;position:relative;top:25%;padding-left: 2rem">CODE PROMO</h1>
            </div>
            <div style="background:azure;padding: 2rem;box-shadow: 10px 6px 6px 1px rgba(0, 0, 0, 0.6);">

                <div>
                    <p>${titrepromotion}
                    </p>
                    <p>${descriptionpromotion}</p>
                
                    <button style="margin-left: auto; background-color: rgb(44, 61, 78);
    border: none;
    color: azure;
    width: 100%;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    border-radius: 5px;
 box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    font-size: 16px;margin-top:2rem;margin-bottom:2rem;">${codePromotion}</button>
                   
                    <small>Code promo valide jusqu'au ${dateFinPromo}
                    </small>
                </div>
            </div>
        </div>
        </body>`;
const footer = `  <footer style="font-size:75%; padding: 1.1rem;background-color:rgba(193, 56, 50,1);text-align: center;width: 80%;margin: auto;color: azure;margin-top: 3rem;box-shadow: 10px 6px 6px 1px rgba(0, 0, 0, 0.6)">

                <small>Pour les questions relatives aux plats ou au paiement, vous pouvez appeler Zappo, 6 Rue Challemel Lacour,
                    69007 Lyon au 04 72 71 79 88.</small>
                <br/>
                <small> Votre numéro de commande Zappo est ${numerocommande}. Zappo, 6 Rue Challemel Lacour, 69007 Lyon </small>
                <br/>
                <small>© 2018 Zappo</small>

            </footer>`;

module.exports = router;
