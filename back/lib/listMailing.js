const {
  Transporter,
  Head,
  Message,
  Header,
  Footer,
  End
} = require("./configmail");
const moment = require("moment");

const emailNewOrder = (user, orderNb) => {
  const text = `Nous avons bien reçu votre commande ${orderNb}, vous recevrez un mail dès que nos pizzaïolis l'auront validée.`;
  Transporter.sendMail(
    {
      from: "zappo@lebloc.net", // Expediteur
      to: user.email, // Destinataires
      subject: `Commande en cours de validation`, // Sujet
      html: `${Head} ${Header("En cours de validation")} ${Message(
        user.name,
        text
      )} ${Footer} ${End}` // html body
    },
    (error, response) => {
      if (error) {
        return false;
      } else {
        return true;
      }
    }
  );
};

const emailResetPassword = user => {
  const footerHtml = `<td width="300" align="right" valign="center" style="padding:10px;">
        <a href="http://localhost:3000/identification/modification-de-mot-de-passe/${
          user.password
        }" target="_blank" style="font-size:17px;font-family: Arial, sans-serif; color:#ffffff; display: inline-block; text-decoration: none; line-height:44px; width:200px; text-align:center;font-weight:600;background-color:#c1392f">Réinitialiser</a>
        </td>`;
  const text =
    "Vous avez fait une demande de réinitialisation de mot de passe, cliquez sur le lien ci-dessous";
  Transporter.sendMail(
    {
      from: "zappo@lebloc.net", // Expediteur
      to: user.email, // Destinataires
      subject: `Réinitialisation de mot de passe`, // Sujet
      html: `${Head} ${Header("Nouveau Mot de passe")} ${Message(
        user.name,
        text,
        "",
        footerHtml
      )} ${Footer} ${End}` // html body
    },
    (error, response) => {
      if (error) {
        return false;
      } else {
        return true;
      }
    }
  );
};

const emailValidatedOrder = (order, user, time) => {
  const pendingTime = moment(time).format("dddd DD MMMM à LT");
  const text = `Nos pizzaïoli ont validé votre commande n°${
    order.uid
  }. Rendez-vous le ${pendingTime}.<br/><br/><strong>Rappel de votre commande : </strong>`;
  const start = ` <table width="640" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:640px; width:100%;" bgcolor="#FFFFFF">
                        <tr>
                            <td align="center" valign="top" style="padding:10px;">
        
                                <table width="600" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:600px; width:100%;font-family: Verdana, Geneva, Tahoma, sans-serif;font-size:0.8em;border:1px solid grey;">
                                    <tr>
                                        <td width="200" align="left" valign="top" style="padding:10px;border: 1px solid grey;">
                                            PRODUIT
                                        </td>
                                        <td width="200" align="right" valign="top" style="padding:10px;border: 1px solid grey;">
                                            QUANTITÉ
                                        </td>
                                        <td width="200" align="right" valign="top" style="padding:10px;border: 1px solid grey;">
                                            PRIX
                                        </td>
                                    </tr>`;
  const bodyList = order.cart
    .map(elt => {
      return `<tr>
                            <td width="200" align="left" valign="top" style="padding:10px;border: 1px solid grey;">
                            ${elt.name}
                                </td>
                            <td width="200" align="right" valign="top" style="padding:10px;border: 1px solid grey;">
                            ${elt.quantity}
                                </td>
                            <td width="200" align="right" valign="top" style="padding:10px;border: 1px solid grey;">
                            ${elt.quantity * elt.ttc_price}€
                                </td>
                        </tr>`;
    })
    .join("");
  const fin = `<tr>
                            <td></td>
                            <td valign="center" align="right" style="padding:20px">Total HT : ${
                              order.totalHT
                            }</td>
                            <td valign="center" align="right" style="padding:20px">Total TTC : ${
                              order.totalTTC
                            }</td>
                    </tr>
                </table>   
             </td>
            </tr>
        </table>`;
  Transporter.sendMail(
    {
      from: "zappo@lebloc.net", // Expediteur
      to: user.email, // Destinataires
      subject: `Commande validée`, // Sujet
      html: `${Head} ${Header("Commande validée")} ${Message(
        user.name,
        text,
        `${start}${bodyList}${fin}`
      )} ${Footer} ${End}` // html body
    },
    (error, response) => {
      if (error) {
        return false;
      } else {
        return true;
      }
    }
  );
};

// EMAIL FINISHED ORDER : DOWNLOAD BILL BUTTON

const emailFinishedOrder = (order, user) => {
  const pendingTime = moment(order.pendingTime).format("dddd DD MMMM à LT");
  const text = `L'équipe vous remercie d'avoir commandé chez Zappo. Vous avez  ${
    user.points > 1
      ? `${user.points} points dans votre compte fidélité. `
      : `${user.points} point dans votre compte fidélité.`
  } Commande n° ${order.uid} à ${pendingTime}`;
  const billButton = `<td width="300" align="right" valign="center" style="padding:10px;">
    <a href="#" target="_blank" style="font-size:17px;font-family: Arial, sans-serif; color:#ffffff; display: inline-block; text-decoration: none; line-height:44px; width:200px; text-align:center;font-weight:600;background-color:#c1392f">Télécharger la facture</a>
    </td>`;

  Transporter.sendMail(
    {
      from: "zappo@lebloc.net", // Expediteur
      to: user.email, // Destinataires
      subject: `Zappo vous remercie`, // Sujet
      html: `${Head} ${Header("Zappo vous remercie")} ${Message(
        user.name,
        text,
        "",
        billButton
      )} ${Footer} ${End}` // html body
    },
    (error, response) => {
      if (error) {
        return false;
      } else {
        return true;
      }
    }
  );
};

const emailCanceledOrder = (user, orderNb) => {
  const text = `Nous avons le regret de vous annoncer que nous avons dû annuler la commande ${orderNb}.<br />
        Le montant intégral de cette commande sera crédité sur le compte de la carte bleue utilisée lors du paiement.`;
  Transporter.sendMail(
    {
      from: "zappo@lebloc.net", // Expediteur
      to: user.email, // Destinataires
      subject: `Commande annulée`, // Sujet
      html: `${Head} ${Header("Commande annulée")} ${Message(
        user.name,
        text
      )} ${Footer} ${End}` // html body
    },
    (error, response) => {
      if (error) {
        return false;
      } else {
        return true;
      }
    }
  );
};

const emailNewAccount = user => {
  const text = `Zappo vous souhaite la bienvenue. Votre compte à été crée avec succès. Vous pouvez désormais vous connecter avec l'adresse mail ${
    user.email
  } et votre mot de passe`;
  Transporter.sendMail(
    {
      from: "zappo@lebloc.net", // Expediteur
      to: user.email, // Destinataires
      subject: `Bienvenue chez Zappo`, // Sujet
      html: `${Head} ${Header("Bienvenue")} ${Message(
        user.name,
        text
      )} ${Footer} ${End}` // html body
    },
    (error, response) => {
      if (error) {
        return false;
      } else {
        return true;
      }
    }
  );
};

module.exports = {
  emailNewOrder,
  emailResetPassword,
  emailValidatedOrder,
  emailFinishedOrder,
  emailNewAccount,
  emailCanceledOrder
};
