const usrRoutr = require("express").Router();
const resHndlr = require("../global/Responder");
const userServices = require("../controllers/userServices");
//const userServices1 = require("../controllers/userServices1");

usrRoutr.route("/createUser")
.post([ /*middleware.authenticate.autntctTkn*/ ], function(req, res) {
     userServices.registration(req, res);
});
usrRoutr.route("/otpVerify")
.post([ /*middleware.authenticate.autntctTkn*/ ], function(req, res) {
     userServices.otpVerify(req, res);
});
usrRoutr.route("/forgotPassword")
.post([ /*middleware.authenticate.autntctTkn*/ ], function(req, res) {
     userServices.forgotPassword(req, res);
});
usrRoutr.route("/resetPassword")
.post([ /*middleware.authenticate.autntctTkn*/ ], function(req, res) {
     userServices.resetPassword(req, res);
});
// usrRoutr.route("/create")
// .post([ /*middleware.authenticate.autntctTkn*/ ], function(req, res) {
//      userServices1.create(req, res);
// });
module.exports = usrRoutr;
