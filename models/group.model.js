const {
  CREATE,
  FIND_BY_GROUP_ID,
  GET_ALL_BY_USER_ID,
  UPDATE_BY_GROUP_ID,
  DELETE_BY_GROUP_ID,
} = require("../constants/group.constants");
const sql = require("./db");

const Group = function (group) {
  this.groupId = group.groupId;
  this.groupUserId = group.groupUserId;
  this.groupName = group.groupName;
};

Group.create = (groupUserId, group, result) => {
  sql.query(CREATE, [groupUserId, group.groupName], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { groupId: res.insertId, groupUserId, ...group });
  });
};

Group.findByGroupId = (groupId, result) => {
  sql.query(FIND_BY_GROUP_ID, groupId, (err, res) => {
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

Group.getAllByUserId = (groupUserId, result) => {
  sql.query(GET_ALL_BY_USER_ID, groupUserId, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Group.updateByGroupId = (groupId, group, result) => {
  sql.query(UPDATE_BY_GROUP_ID, [group.groupName, groupId], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, { groupId, ...group });
  });
};

Group.deleteByGroupId = (groupId, result) => {
  sql.query(DELETE_BY_GROUP_ID, groupId, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, groupId);
  });
};

module.exports = Group;
