var mysql      = require('mysql');
var conn = mysql.createConnection({
  host     : 'MYSQL5014.SmarterASP.NET',
  user     : 'a14696_nodejs',
  password : '1q2w3e4r',
  database : 'db_a14696_nodejs'
});

conn.connect();


/*
var sql = 'SELECT * FROM topic';
conn.query(sql, function(err, rows, fields){
  if(err){
    console.log(err);
  }else{
    // console.log('row',rows);
    // console.log('fields',fields);
    for(var i=0;i<rows.length;i++){
      console.log(rows[i].title);
    }
  }
});
*/

/*
//var sql = 'INSERT INTO topic(title, description, author) VALUES("Nodejs", "Server side javascript", "namso")';
var sql = 'INSERT INTO topic(title, description, author) VALUES(?,?,?)';
var params =['super', 'water', 'graph'];
conn.query(sql,params, function(err, rows, fields){
  if(err){
    console.log(err);
  }else{
    console.log(rows);
  }
});
*/

/*
var sql = 'UPDATE topic SET title=?,description=? WHERE id=?';
var params =['update', 'min', 1];
conn.query(sql,params, function(err, rows, fields){
  if(err){
    console.log(err);
  }else{
    console.log(rows);
  }
});
*/


var sql = 'DELETE FROM topic  WHERE id=?';
var params =[ 1];
conn.query(sql,params, function(err, rows, fields){
  if(err){
    console.log(err);
  }else{
    console.log(rows);
  }
});


conn.end();
