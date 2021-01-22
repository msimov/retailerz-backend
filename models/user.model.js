const { CREATE, FIND_BY_USER_ID, GET_ALL, UPDATE_BY_USER_ID, DELETE_BY_USER_ID } = require('../constants/user.constants');
const sql = require('./db');

const User = function(user) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.type = user.type;
};

User.create = (newUser, result) => {
    sql.query(
        CREATE,
        [newUser.id, newUser.firstName, newUser.lastName, newUser.email, newUser.type],
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            result(null, { id: res.insertId, ...newUser });
        }
    );
};

User.findById = (userId, result) => {
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

User.updateById = (id, user, result) => {
    sql.query(
        UPDATE_BY_USER_ID,
        [user.firstName, user.lastName, user.email, id],
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
            result(null, { id: id, ...user });
        }
    );
};

User.deleteById = (id, result) => {
    sql.query(
        DELETE_BY_USER_ID,
        id,
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
            result(null, id);
        }
    );
}

module.exports = User