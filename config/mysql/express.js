




module.exports=function(){

  var express = require('express');
  var session = require('express-session');
  var MySQLStore = require('express-mysql-session')(session);
  var bodyParser = require('body-parser');

  var app = express();






  //템플릿 엔진 셋팅
  app.set('view engine', 'jade');
  app.set('views', './views/mysql'); //폴더명



  app.use(bodyParser.urlencoded({
      extended: false
  }));
  app.use(session({
      secret: '1234DSFs@adf1234!@#$asd',
      resave: false,
      saveUninitialized: true,
      store: new MySQLStore({

          port: 3306,
          host: 'MYSQL5014.SmarterASP.NET',
          user: 'a14696_nodejs',
          password: '1q2w3e4r',
          database: 'db_a14696_nodejs'
      })
  }));


  return app;
}
