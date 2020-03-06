var dbHandlers = require("../db");

var getContentMenu = (req, res) => {
  dbHandlers.Qgen_traffic_signs.QgetAllTraffic_Sign_Type((err, sign_types) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Unknown error." });
    }
    dbHandlers.Qgen_traffic_signs.QgetAllTraffic_Signs((err, signs) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Unknown error." });
        }

        signs.forEach(sign => {
            sign_types.forEach(sign_type => {
                if (!sign_type.children) {
                    sign_type.children = []
                }

                if (sign_type.idTraffic_Signs_Type === sign.Traffic_Signs_Type_idTraffic_Signs_Type) {
                    sign_type['children'] = [ ...sign_type['children'], sign ]
                }
            })
        });

        return res.send(sign_types);
        });
  });
};

module.exports = {
  getContentMenu
};
