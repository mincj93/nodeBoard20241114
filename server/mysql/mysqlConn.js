const mysql = require('mysql');
const lg = console.log;


const mysqlConn = {};

mysqlConn.connectDb = async (query) => {
    console.log('\n\n\n\n\n\n\n\n\nquery == ', query);
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection({
            host: process.env.HOST,
            port: process.env.PORT,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE
        });

        connection.connect();

        connection.query(query, (error, rows) => {
            if (error) {
                reject(error);
            } else {
                resolve(rows);
            }
            connection.end();
        });
    });
};

// Client does not support authentication protocol requested by server; consider upgrading MySQL client 에러 발생시 하단 참고
// https://1mini2.tistory.com/88
module.exports = mysqlConn;