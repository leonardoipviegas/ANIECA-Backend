var dbHandlers = require("../db");

var getAccountByEntityId = (req, res) => {
  dbHandlers.Qgen_accounts.Qget_AccountByIdEntity(
    req.params.entity,
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Unknown error." });
      }

      return res.send(results);
    }
  );
};

var getAccounts = (req, res) => {
  dbHandlers.Qgen_accounts.Qget_AccountByIdEntity(1, (err, per) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Unknown error." });
    }

    dbHandlers.Qgen_accounts.Qget_AccountByIdEntity(2, (err, sch) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Unknown error." });
      }

      dbHandlers.Qgen_accounts.Qget_AccountByIdEntity(3, (err, adm) => {
        if (err) {
          console.log(err);
          res.status(500).send({ message: "Unknown error." });
        }

        return res.send([per, sch, adm]);
      });
    });
  });
};

var deleteAccountById = (req, res) => {
  dbHandlers.Qgen_accounts.Qdelete_AccountById(req.query.idAccount, err => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Unknown error." });
    }

    return res.send({ message: "Row deleted." });
  });
};

module.exports = {
  getAccountByEntityId,
  deleteAccountById,
  getAccounts
};
