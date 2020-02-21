// get account by user
var Qget_byPermitAccount = (permit, cb) => {
  return myQuery(
    "SELECT * FROM Account WHERE Account.Permit = ?",
    [permit],
    (error, results, fields) => {
      error ? cb(error) : cb(null, results[0]);
    }
  );
};

var Qget_byEmailAccount = (email, cb) => {
  return myQuery(
    "SELECT * FROM Account WHERE Account.Email = ?",
    [email],
    (error, results, fields) => {
      error ? cb(error) : cb(null, results[0]);
    }
  );
};

// get account by id
var Qget_byIdAccount = (id, cb) => {
  return myQuery(
    "SELECT * FROM Account WHERE Account.idAccount = ?",
    [id],
    (error, results, fields) => {
      error ? cb(error) : cb(null, results[0]);
    }
  );
};

// create record for student
var Qcreate_Account = (values, cb) => {
  return myQuery(
    "INSERT INTO Account (Email, Permit, Entity_idEntity, Hash, Salt) VALUES (?)",
    [values],
    (error, results) => {
      error ? cb(error) : cb(null, results);
    }
  );
};

var Qget_AccountByIdEntity = (entity, cb) => {
  return myQuery(
    "SELECT idAccount, Email, Permit from Account WHERE Entity_idEntity = ?",
    [entity],
    (error, results) => {
      error ? cb(error) : cb(null, results);
    }
  );
}

var Qdelete_AccountById = (id, cb) => {
  return myQuery(
    "DELETE FROM Account WHERE idAccount = ?",
    [id],
    (error, results) => {
      error ? cb(error) : cb(null, results);
    }
  );
}

module.exports = function(myQuery) {
  return {
    Qget_byEmailAccount,
    Qget_byPermitAccount,
    Qget_byIdAccount,
    Qcreate_Account,
    Qget_AccountByIdEntity,
    Qdelete_AccountById
  };
};
