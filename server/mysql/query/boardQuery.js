const boardQuery = {};

// 게시물 전체
boardQuery.getAllBrdList = `select * from board order by regdt desc`;

// 게시물 최근등록 5개
boardQuery.getBrdLast5 = 'select * from board order by regdt desc limit 5';

// 게시물 상세
boardQuery.getBrdDtl = `select * from board where idx = ?`;

module.exports = boardQuery;