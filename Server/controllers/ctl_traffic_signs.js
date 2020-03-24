var dbHandlers = require("../db");

var getTraffic_Signs_TypeById = (req, res) => {
  dbHandlers.Qgen_traffic_signs.QgetTraffic_Sign_TypeById(
    req.query.idTraffic_Signs_Type,
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Unknown error." });
      }
      return res.send(results[0]);
    }
  );
};

var patchTraffic_Signs_TypeById = (req, res) => {
  dbHandlers.Qgen_traffic_signs.QpatchTraffic_Sign_TypeById(
    JSON.parse(
      JSON.stringify({
        Name: req.body.Name,
        Text: req.body.Text,
        Placement_Text: req.body.Placement_Text,
        Placement_Image_Route: req.body.Placement_Image_Route
      })
    ),
    req.query.idTraffic_Signs_Type,
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Unknown error." });
      }
      return res.send(results);
    }
  );
};

var getTraffic_Signs_ImageByTypeId = (req, res) => {
  dbHandlers.Qgen_traffic_signs.QgetTraffic_Signs_ImageByTypeId(
    req.query.idTraffic_Signs_Type,
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Unknown error." });
      }
      return res.send(results);
    }
  );
};

var getTraffic_SignById = (req, res) => {
  dbHandlers.Qgen_traffic_signs.QgetTraffic_SignById(
    req.query.idTraffic_Signs,
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Unknown error." });
      }

      results[0].Examples = JSON.parse(results[0].Examples)
      return res.send(results);
    }
  );
};

var postTraffic_Sign = (req, res) => {
    dbHandlers.Qgen_traffic_signs.QpostTraffic_Sign(
      [
        req.body.Name,
        req.body.Text,
        req.body.Image_Route,
        req.body.Traffic_Signs_Type_idTraffic_Signs_Type
      ],
        (err, results) => {
          if (err) {
            console.log(err);
            res.status(500).send({ message: "Unknown error." });
          }
          return res.send(results);
        }
      );
}

var patchTraffic_SignById = (req, res) => {
  dbHandlers.Qgen_traffic_signs.QpatchTraffic_SignById(
    JSON.parse(
      JSON.stringify({
        Name: req.body.Name,
        Text: req.body.Text,
        Image_Route: req.body.Image_Route,
        Example_1_Image_Route: req.body.Example_1_Image_Route,
        Example_2_Image_Route: req.body.Example_2_Image_Route,
        Example_3_Image_Route: req.body.Example_3_Image_Route
      })
    ),
    req.query.idTraffic_Signs,
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Unknown error." });
      }
      return res.send(results);
    }
  );
};

var deleteTraffic_SignById = (req, res) => {
    dbHandlers.Qgen_traffic_signs.QdeleteTraffic_SignById(
        req.query.idTraffic_Signs,
        (err, results) => {
          if (err) {
            console.log(err);
            res.status(500).send({ message: "Unknown error." });
          }
          return res.send(results);
        }
      );
}

module.exports = {
  getTraffic_Signs_TypeById,
  patchTraffic_Signs_TypeById,
  getTraffic_Signs_ImageByTypeId,
  getTraffic_SignById,
  patchTraffic_SignById,
  deleteTraffic_SignById,
  postTraffic_Sign
};
