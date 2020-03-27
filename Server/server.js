var express = require("express");
var bodyParser = require("body-parser");
var http = require("http");
const path = require("path");
const cors = require("cors");
var controllers = require("./controllers");

var passport = require("passport");
require("./controllers").passport;
const publicPath = path.join(__dirname, "../public");

var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

var config = require("./config.json");
var port = process.env.PORT || config.backend.port;

var app = express();
var server = http.createServer(app);

app.use(express.static(publicPath));
app.use(cors());
// requires the use bodyParser for messages
app.use(bodyParser.json());
// ---------------------passport---------------------
app.use(passport.initialize());
app.use(passport.session());

app.use(require("./controllers/middleware/authentication"));
app.post("/api/login/", controllers.authentication.login);
app.post("/api/signup/", controllers.authentication.signup);

//account
app.get("/api/account/", controllers.account.getAccounts);
app.get("/api/account/:entity", controllers.account.getAccountByEntityId);
app.delete("/api/account/", controllers.account.deleteAccountById);

// sign type
app.get('/api/content/traffic-signs/', controllers.traffic_signs.getTraffic_Signs_TypeById)
app.patch('/api/content/traffic-signs/', controllers.traffic_signs.patchTraffic_Signs_TypeById)

// signs
app.get('/api/content/traffic-signs/images/', controllers.traffic_signs.getTraffic_Signs_ImageByTypeId)
app.get('/api/content/traffic-signs/sign/', controllers.traffic_signs.getTraffic_SignById)
app.post('/api/content/traffic-signs/sign/', controllers.traffic_signs.postTraffic_Sign)
app.patch('/api/content/traffic-signs/sign/', controllers.traffic_signs.patchTraffic_SignById)
app.delete('/api/content/traffic-signs/sign/', controllers.traffic_signs.deleteTraffic_SignById)

//signs examples

app.delete('/api/content/traffic-signs/sign/examples/', controllers.traffic_signs.deleteTraffic_SignExamplesById)

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
