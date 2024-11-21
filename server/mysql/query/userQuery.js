const userQuery ={};

userQuery.getUser = `select * from users where id = ? and pwOrg = ?`;


module.exports = userQuery;