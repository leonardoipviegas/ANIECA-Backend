QgetAllTraffic_Sign_Type = (cb) => {
  return myQuery(
    "SELECT * FROM Traffic_Signs_Type",
    (error, results) => {
      error ? cb(error) : cb(null, results);
    }
  );
};

QgetTraffic_Sign_TypeById = (id, cb) => {
  return myQuery(
    "SELECT * FROM Traffic_Signs_Type WHERE idTraffic_Signs_Type = ?",
    [id],
    (error, results) => {
      error ? cb(error) : cb(null, results);
    }
  );
};

QpatchTraffic_Sign_TypeById = (patch, id, cb) => {
  return myQuery(
    "UPDATE Traffic_Signs_Type SET ? WHERE idTraffic_Signs_Type = ?;",
    [patch, id],
    (error, results) => {
      error ? cb(error) : cb(null, results);
    }
  );
};

QgetTraffic_Signs_ImageByTypeId = (id, cb) => {
  return myQuery(
    "SELECT idTraffic_Signs, Image_Route FROM Traffic_Signs " +
      "INNER JOIN Traffic_Signs_Type ON " +
      "Traffic_Signs.Traffic_Signs_Type_idTraffic_Signs_Type = Traffic_Signs_Type.idTraffic_Signs_Type " +
      "WHERE idTraffic_Signs_Type = ?",
    [id],
    (error, results) => {
      error ? cb(error) : cb(null, results);
    }
  );
};

QgetAllTraffic_Signs = (cb) => {
  return myQuery(
    "SELECT * FROM Traffic_Signs ",
    (error, results) => {
      error ? cb(error) : cb(null, results);
    }
  );
};

QpostTraffic_Sign = (post, cb) => {
  return myQuery(
    "INSERT INTO `Traffic_Signs` (`Name`, `Text`, `Image_Route`, " +
    "`Traffic_Signs_Type_idTraffic_Signs_Type`, `Example_1_Image_Route`, `Example_2_Image_Route`, " +
    "`Example_3_Image_Route`) VALUES (?)",
    [post],
    (error, results) => {
      error ? cb(error) : cb(null, results);
    }
  );
};

QgetTraffic_SignById = (id, cb) => {
  return myQuery(
    "SELECT * FROM Traffic_Signs WHERE idTraffic_Signs = ?",
    [id],
    (error, results) => {
      error ? cb(error) : cb(null, results);
    }
  );
};

QpatchTraffic_SignById = (patch, id, cb) => {
  return myQuery(
    "UPDATE Traffic_Signs SET ? WHERE idTraffic_Signs = ?;",
    [patch, id],
    (error, results) => {
      error ? cb(error) : cb(null, results);
    }
  );
};

QdeleteTraffic_SignById = (id, cb) => {
  return myQuery(
    "DELETE FROM Traffic_Signs WHERE idTraffic_Signs = ?;",
    [id],
    (error, results) => {
      error ? cb(error) : cb(null, results);
    }
  );
};

module.exports = function(myQuery) {
  return {
    QgetAllTraffic_Sign_Type,
    QgetTraffic_Sign_TypeById,
    QpatchTraffic_Sign_TypeById,
    QgetTraffic_Signs_ImageByTypeId,
    QgetTraffic_SignById,
    QpatchTraffic_SignById,
    QdeleteTraffic_SignById,
    QpostTraffic_Sign,
    QgetAllTraffic_Signs
  };
};
