const {
  FIND_BY_USER_TYPE_ID,
  GET_ALL,
} = require("../constants/user-types.constants");
const sql = require("./db");

const UserType = function (userType) {
  this.userTypeId = userType.userTypeId;
  this.userTypeName = userType.userTypeName;
};

UserType.findByUserTypeId = (userTypeId, result) => {
  sql.query(FIND_BY_USER_TYPE_ID, userTypeId, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

UserType.getAll = (result) => {
  sql.query(GET_ALL, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

module.exports = UserType;
