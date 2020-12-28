const sql = require('./db');

const UserType = function(userType) {
    this.id = userType.id;
    this.type = userType.type;
};

UserType.findById = (userTypeId, result) => {
    sql.query(
        `SELECT * FROM user_types WHERE id = ?`,
        userTypeId,
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }

            if(res.length) {
                console.log("Found user type: ", res[0]);
                result(null, res[0]);
                return;
            }

            result({ kind: "not_found" }, null);
        }
    );
};

UserType.getAll = result => {
    sql.query(
        "SELECT * FROM user_types",
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            
            console.log("Products: ", res);
            result(null, res);
        }
    );
};

module.exports = UserType