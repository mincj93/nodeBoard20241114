const boardQuery = {};

// 게시물 전체
boardQuery.getAllBrdList = `select * from board order by regdt desc`;

// 게시물 최근등록 5개
boardQuery.getBrdLast5 = 'select * from board order by idx desc limit 5';

// 게시물 상세
boardQuery.getBrdDtl = `select * from board where idx = ?`;

// 총 개수 및 페이지별 목록 호출
boardQuery.getBrdList = `CALL getBrdList(?, ?, ?, ?)`;

// 게시물 등록
boardQuery.insertBrd = `insert into board (title, content, regid) values (?, ?, ?)`;

// 게시물 삭제
boardQuery.deleteBrd = `delete from board where idx = ?`;

module.exports = boardQuery;