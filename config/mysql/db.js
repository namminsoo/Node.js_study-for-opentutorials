

module.exports = function(){




  var mysql = require('mysql');

  var conn = mysql.createConnection({
      host: 'MYSQL5014.SmarterASP.NET',
      user: 'a14696_nodejs',
      password: '1q2w3e4r',
      database: 'db_a14696_nodejs'
  });

  conn.connect();


  return conn;
}
