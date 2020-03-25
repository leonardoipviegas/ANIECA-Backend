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
    "SELECT idTraffic_Signs, Traffic_Signs.Name, Image_Route FROM Traffic_Signs " +
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
    "`Traffic_Signs_Type_idTraffic_Signs_Type`) VALUES (?)",
    [post],
    (error, results) => {
      error ? cb(error) : cb(null, results);
    }
  );
};

QpostTrafficSignType = (post, cb) => {
  return myQuery(
    "INSERT INTO `traffic_signs_type` (`Name`, `Text`, `Placement_Text`, `Placement_Image_Route`) " +
    "VALUES (?)", [post],
    (error, results) => {
      error ? cb(error) : cb(null, results)
    }
  )
}

QgetTraffic_SignById = (id, cb) => {
  return myQuery(
    "SELECT Traffic_Signs.*, CONCAT( '[', GROUP_CONCAT( CONCAT( " +
      "'{\"idTraffic_Signs_Examples\":', Traffic_Signs_Examples.idTraffic_Signs_Examples, " +
      "', \"Example_Image_Route\":\"', Traffic_Signs_Examples.Example_Image_Route, '\"}' )), ']') " +
      "AS Examples FROM Traffic_Signs " +
      "LEFT JOIN Traffic_Signs_Examples ON Traffic_Signs.idTraffic_Signs = Traffic_Signs_Examples.Traffic_Signs_idTraffic_Signs " +
      "WHERE Traffic_Signs.idTraffic_Signs = ? " +
      "GROUP BY Traffic_Signs.idTraffic_Signs",
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
    QpostTrafficSignType,
    QgetAllTraffic_Signs
  };
};
