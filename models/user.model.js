const { CREATE, FIND_BY_USER_ID, GET_ALL, UPDATE_BY_USER_ID, DELETE_BY_USER_ID } = require('../constants/user.constants');
const sql = require('./db');

const User = function(user) {
    this.userId = user.userId;
    this.userFirstName = user.userFirstName;
    this.userLastName = user.userLastName;
    this.userEmail = user.userEmail;
    this.userUserTypeId = user.userUserTypeId;
};

User.create = (user, result) => {
    sql.query(
        CREATE,
        [user.userId, user.userFirstName, user.userLastName, user.userEmail, user.userUserTypeId],
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            result(null, { userId: res.insertId, ...user });
        }
    );
};

User.findByUserId = (userId, result) => {
    sql.query(
        FIND_BY_USER_ID,
        userId,
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }

            if(res.length) {
                result(null, res[0]);
                return;
            }

            result({ kind: "not_found" }, null);
        }
    );
};

User.getAll = result => {
    sql.query(
        GET_ALL,
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            result(null, res);
        }
    );
};

User.updateByUserId = (userId, user, result) => {
    sql.query(
        UPDATE_BY_USER_ID,
        [user.userFirstName, user.userLastName, user.userEmail, userId],
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            if(res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { userId, ...user });
        }
    );
};

User.deleteByUserId = (userId, result) => {
    sql.query(
        DELETE_BY_USER_ID,
        userId,
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            if(res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, userId);
        }
    );
}

module.exports = User