/*********************************************************************************************************************************************
 * *************************************************************************
 * *************************************************************************
 *  Configuration of Framework Express
 * *************************************************************************
 * *************************************************************************
 ******************************************************************************************************************************************/

const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const sharedSession = require("express-socket.io-session");
const port = 5000;
const debug = require("debug")("http"); // Module for Debug
const logger = require("morgan"); // Module for Log
const bodyParser = require("body-parser"); // Module for POST/GET datas
const cookieParser = require("cookie-parser"); // Module for cookie in Session
const session = require("express-session");

const db = require(`./models/index.js`);
const sequelize = require('sequelize');
const Op = sequelize.Op;
const passport = require("passport");
const moment = require('moment');
require("./middlewares/passeport"); //New Strategy local for check user with passport

const colors = require("colors/safe"); //New Strategy local for check user with passport

app.use(express.static(__dirname + "/public")); // all statics files in /public
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(bodyParser.json()); // API response en JSON
app.use(
  // donnée en get post non encodé par l'URL
  bodyParser.urlencoded({
    extended: false
  })
);

/**
 * Configuration of Session
 */
const Session = session({
  secret: "*****JeSuisLaClefSecrèteWild2018*****",
  saveUninitialized: true,
  resave: true,
  cookie: {
    maxAge: 100 * 60 * 60 * 24 * 30
  } // lifetime of cookie = 30 days
});

app.use(Session);


io.use(sharedSession(Session,{autoSave:true}))


// Initialize Passport Module
app.use(passport.initialize());
app.use(passport.session());


/**
 * For APIs
 */
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5000"],
    credentials: true
  })
);

/**
 * Store in global variables
 */
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user; // this line
  next();
});



/*********************************************************************************************************************************************
 * *************************************************************************
 * *************************************************************************
 *  Routing
 * *************************************************************************
 * *************************************************************************
 ******************************************************************************************************************************************/
/**
 * Middleware
 */

// Middleware pour des messages flash
app.use((request, response, next) => {
  if (request.session.flash) {
    response.locals.flash = request.session.flash;
    request.session.flash = undefined;
  }

  request.flash = (type, content) => {
    if (request.session.flash === undefined) {
      request.session.flash = {};
    }
    request.session.flash[type] = content;
  };

  next();
});

io.origins(["http://localhost:3000", "http://localhost:5000"])

io.on("connection", function (socket) {
  db.orders.afterCreate(order => {
    db.orders.findAll({ 
      where: {
        pending_time: {
          [Op.lte]: moment().add(1, 'days').format(),
          [Op.gte]: new Date()
        }
      },
      include: [{ model: db.users }] }).then(orders => socket.emit('created', orders));
  });
  db.orders.afterUpdate(order => {
    db.orders.findAll({ 
      where: {
        pending_time: {
          [Op.lte]: moment().add(1, 'days').format(),
          [Op.gte]: new Date()
        }
      },
      include: [{ model: db.users }] }).then(orders => socket.emit('updated', orders));
  });

  socket.on("warning", bool => socket.broadcast.emit('online',bool));
});




/**
 * Routing
 */
const admin = require("./routes/admin");
const products = require("./routes/products");
const orders = require("./routes/orders");
const api = require("./routes/api");
const timing = require("./routes/timing");
const stats = require("./routes/stats");
const dashboard = require("./routes/dashboard");
const discounts = require("./routes/discounts");

//routes for back-end admin
app.use("/admin", admin);
app.use("/admin/reglages", timing);
app.use("/admin/produits", products);
app.use("/admin/dashboard", dashboard);
app.use("/admin/statistiques", stats);
app.use("/admin/promotions", discounts);

//routes for front API and back-end Admin
app.use("/api-orders/", orders);

//routes for front API
app.use("/api", api);

//routes test pour mail
const mail = require("./routes/mail");
app.use("/test", mail);


// Handle 500
app.use((error, req, res, next) => {
  res.status(500);
  console.error(colors.bold.red.underline(error.stack));
  res.render("errors/500", {
    message: error.message,
    stack: error.stack,
    error: error
  });
});

app.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

/*********************************************************************************************************************************************
 * *************************************************************************
 * *************************************************************************
 *  Running Server
 * *************************************************************************
 * *************************************************************************
 ******************************************************************************************************************************************/


server.listen(port, err => {
  if (!err) console.log(colors.rainbow("Site is live... Go ahead"));
  else console.log(colors.rainbow(err));
  console.log("🤓");
});


