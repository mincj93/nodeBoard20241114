const authQuery = {};

authQuery.checkUserId = `select * from users where id = ?`;


module.exports = authQuery;