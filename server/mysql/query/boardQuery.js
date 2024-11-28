const boardQuery ={};

boardQuery.getBrdLast5 = 'select * from board order by regdt desc limit 5';
boardQuery.getBrdDtl = `select * from board where idx = ?`;

module.exports = boardQuery;