const sql = require('./db');

const User = function(user) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.type = user.type;
};

User.create = (newUser, result) => {
    sql.query(
        "INSERT INTO users (first_name, last_name, email, type) VALUES (?, ?, ?, ?)",
        [newUser.firstName, newUser.lastName, newUser.email, newUser.type], 
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }

            console.log("Created user: ", { id: res.insertId, ...newUser });
            result(null, { id: res.insertId, ...newUser });
    });
};

User.findById = (userId, result) => {
    sql.query(`SELECT * FROM users WHERE id = ${userId}`, (err, res) => {
        if(err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }

        if(res.length) {
            console.log("Found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

User.getAll = result => {
    sql.query("SELECT * FROM users", (err, res) => {
        if(err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }
        
        console.log("Users: ", res);
        result(null, res);
    });
};

User.updateById = (id, user, result) => {
    sql.query(
        "UPDATE users SET first_name = ?, last_name = ?, email = ?",
        [user.firstName, user.lastName, user.email],
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

            console.log("Updated user: ", { id: id, ...user });
            result(null, { id: id, ...user });
        });
};

User.deleteById = (id, result) => {
    sql.query(`DELETE FROM users WHERE id = ${id}`, (err, res) => {
        if(err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }
        if(res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Deleted user with id: ", id);
        result(null, id);
    });
}

module.exports = User