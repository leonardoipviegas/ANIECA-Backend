var passport = require("passport");
var dbHandlers = require("../db");
var config = require("../config.json");
//jwt
var crypto = require("crypto");
var jwt = require("jsonwebtoken");
var exp;

var generateToken = account => {
  var expire = new Date();
  expire.setDate(expire.getDate() + 7);
  exp = parseInt(expire.getTime() / 1000)

  return jwt.sign(
    {
      _id: account._id,
      email: account.email,
      permit: account.permit,
      entity: account.entity,
      exp
    },
    config.backend.jwt_secret
  );
};

module.exports = {
  signup: (req, res) => {
    console.log("Creating account");

    if ((req.body.Email || req.body.Permit) && req.body.Password) {
      //set account's password
      let Salt = crypto.randomBytes(16).toString("hex");
      let Hash = crypto
        .pbkdf2Sync(req.body.Password, Salt, 100000, 64, "sha512")
        .toString("hex");
      //create account

      dbHandlers.Qgen_accounts.Qcreate_Account(
        [req.body.Email, req.body.Permit, req.body.Entity, Hash, Salt],
        (e, r) => {
          if (e) {
            if (e.code === "ER_DUP_ENTRY") {
              res.status(400).send({ message: "Account already exists" });
            } else {
              console.log(e)
              res.status(500).send(e);
            }
          } else {
            console.log("Account created");
            res.status(200).send({
              token: generateToken({
                _id: r.insertId,
                email: req.body.Email,
                permit: req.body.Permit,
                entity: req.body.Entity
              })
            });
          }
        }
      );
    } else {
      res.status(400).json({ message: "Bad params." });
    }
  },
  login: (req, res) => {
    var entity;
    console.log("Received login");
    if ((req.body.Email || req.body.Permit) && req.body.Password) {
      console.log("Log In");

      if (req.body.Email) {
        entity = "email";
      } else {
        entity = "permit";
      }

      passport.authenticate(entity, (e, account, info) => {
        if (e) {
          console.log("Error authenticating");
          res.status(404).json(e);
        }

        if (account) {
          console.log("Password valid");

          var token = generateToken({
            _id: account._id,
            email: account.email,
            permit: account.permit,
            entity: account.entity
          });

          res.status(200).json({
            token,
            expiresIn: exp - (new Date().getTime() / 1000)
          });

          console.log({
            token,
            expiresIn: exp - (new Date().getTime() / 1000)
          });
        } else {
          res.status(401).json(info);
        }
      })(req, res);
    }
  }
};
