const express = require("express");
const path = require("path");
const app = express();
const port = 3500;
const colors = require("colors");

app.use(express.static(__dirname + "/src"));

app.get("/", (req, res) => res.sendFile(path.resolve("src", "index.html")));

app.get("/bienvenue", (req, res) =>
  res.sendFile(path.resolve("src", "homepage.html"))
);
// HOMEPAGE FROM USER LOGIN PAGE
app.post("/bienvenue", (req, res) =>
  res.sendFile(path.resolve("src", "homepage.html"))
);

app.get("/connexion", (req, res) =>
  res.sendFile(path.resolve("src", "userLogin.html"))
);
// IF THE PAYMENT APP SEND AN ERROR
app.get("/paiementrefuse", (req, res) =>
  res.sendFile(path.resolve("src", "error.html"))
);
app.get("/creermoncompte", (req, res) =>
  res.sendFile(path.resolve("src", "userRegisterAccount.html"))
);

app.get("/moncompte", (req, res) =>
  res.sendFile(path.resolve("src", "userAccount.html"))
);
app.get("/mescommandes", (req, res) =>
  res.sendFile(path.resolve("src", "userOrders.html"))
);
app.get("/moncompte/modifier", (req, res) =>
  res.sendFile(path.resolve("src", "userAccountModify.html"))
);

app.get("/comptesupprimer", (req, res) =>
  res.sendFile(path.resolve("src", "userAccountDeleted.html"))
);
app.get("/motdepasseperdu", (req, res) =>
  res.sendFile(path.resolve("src", "userLostPassword.html"))
);
app.post("/emailenvoye", (req, res) =>
  res.sendFile(path.resolve("src", "userPasswordEmailSent.html"))
);
app.get("/infos", (req, res) =>
  res.sendFile(path.resolve("src", "practicalInfos.html"))
);
app.get("/panier", (req, res) =>
  res.sendFile(path.resolve("src", "basket.html"))
);
app.post("/paiement", (req, res) =>
  res.sendFile(path.resolve("src", "payment.html"))
);
// FROM GOODNEWS OR RAPID ORDERING
app.get("/paiement", (req, res) =>
  res.sendFile(path.resolve("src", "payment.html"))
);
app.get("/macommande", (req, res) =>
  res.sendFile(path.resolve("src", "order.html"))
);
app.get("/enattente", (req, res) =>
  res.sendFile(path.resolve("src", "pendingOrder.html"))
);
app.post("/remerciements", (req, res) =>
  res.sendFile(path.resolve("src", "goodNews.html"))
);

app.listen(port, err => {
  console.clear();
  if (!err) console.log(colors.rainbow("Zappo front is alive"));
  else console.log(colors.rainbow(err));
  console.log("🤓");
});
