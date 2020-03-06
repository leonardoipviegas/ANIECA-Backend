var passport = require("passport");
var CustomStrategy = require("passport-custom").Strategy;

const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

var dbHandlers = require("../db");
var crypto = require("crypto");

var config = require("../config.json");

var verifyPassword = (accountInfo, password) => {
  console.log("Verifying password" + JSON.stringify(accountInfo));
  let temphash = crypto
    .pbkdf2Sync(password, accountInfo.Salt, 100000, 64, "sha512")
    .toString("hex");
  console.log("Password hashed");
  if (accountInfo.Hash === temphash) {
    console.log("OK Password");
    return true;
  } else {
    console.log("Wrong Password");
    return false;
  }
};
passport.use(
  "permit",
  new CustomStrategy(({ body }, done) => {
    console.log("Getting account by permit");
    dbHandlers.Qgen_accounts.Qget_byPermitAccount(
      body.Permit,
      (err, accountInfo) => {
        if (err) {
          console.log("Error getting account");
          return done(err);
        }
        if (!accountInfo) {
          console.log("Account not found");
          return done(null, false, { message: "Account not found" });
        }

        if (!verifyPassword(accountInfo, body.Password)) {
          return done(null, false, { message: "Password is wrong" });
        } else {
          return done(null, {
            _id: accountInfo.idAccount,
            permit: accountInfo.Permit,
            entity: accountInfo.Entity_idEntity
          });
        }
      }
    );
  })
);
passport.use(
  "email",
  new CustomStrategy(({ body }, done) => {
    console.log("Getting account by email");

    dbHandlers.Qgen_accounts.Qget_byEmailAccount(
      body.Email,
      (err, accountInfo) => {
        if (err) {
          console.log("Error getting account");
          return done(err);
        }
        if (!accountInfo) {
          console.log("Account not found");
          return done(null, false, { message: "Account not found" });
        }
        if (!verifyPassword(accountInfo, body.Password)) {
          return done(null, false, { message: "Password is wrong" });
        } else {
          return done(null, {
            _id: accountInfo.idAccount,
            email: accountInfo.Email,
            entity: accountInfo.Entity_idEntity
          });
        }
      }
    );
  })
);

passport.serializeUser(function(account, done) {
  //serialize by user id
  done(null, account._id);
});

passport.deserializeUser(function(id, done) {
  //find user in database again
  dbHandlers.Qgen_accounts.Qget_byIdAccount(id, (err, results) => {
    if (!err) {
      done(null, results);
    } else {
      done(err);
    }
  });
});
