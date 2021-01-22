const { CREATE, FIND_BY_STORE_ID, GET_ALL_BY_USER_ID, UPDATE_BY_STORE_ID, DELETE_BY_STORE_ID } = require('../constants/store.constants');
const sql = require('./db');

const Store = function(store) {
    this.storeId = store.storeId;
    this.userId = store.userId;
    this.location = store.location;
}

Store.create = (userId, store, result) => {
    sql.query(
        CREATE,
        [userId, store.location],
        (err, res) => {
            if(err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            result(null, { storeId: res.insertId, ...store });
        }
    );
};

Store.findByStoreId = (storeId, result) => {
    sql.query(
        FIND_BY_STORE_ID,
        storeId,
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

Store.getAllByUserId = (userId, result) => {
    sql.query(
        GET_ALL_BY_USER_ID,
        userId,
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

Store.updateByStoreId = (storeId, store, result) => {
    sql.query(
        UPDATE_BY_STORE_ID,
        [store.location, storeId],
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
            result(null, { storeId, ...store });
        }
    );
};

Store.deleteByStoreId = (storeId, result) => {
    sql.query(
        DELETE_BY_STORE_ID,
        storeId,
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
            result(null, storeId);
        }
    );
}

module.exports = Store