//express 사용
var express = require('express');
var app = express();
var multer = require('multer');

//npm install express-session --save
var session = require('express-session');
//기본적으로 메모리에 데이터 저장.
//실제 서비스는 DB에 저장해야 됨.

//미들웨어, POST를 하기 위해
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

var MySQLStore = require('express-mysql-session')(session);

var options = {
    port: 3306,
    host: 'MYSQL5014.SmarterASP.NET',
    user: 'a14696_nodejs',
    password: '1q2w3e4r',
    database: 'db_a14696_nodejs'
};


var sessionStore = new MySQLStore(options);

app.use(session({
    secret: '1q2w3e4r',
    resave: false,
    saveUninitialized: true,
    store: sessionStore
}))


app.get('/count', (req, res) => {
    if (req.session.count1) {
        req.session.count1++;
    } else {
        req.session.count1 = 1;
    }
    res.send('result : ' + req.session.count1);
})

app.get('/welcome', (req, res) => {

    if (req.session.displayName) {
        res.send(`
                <h1>Hello, ${req.session.displayName}</h1>
                <a href="/auth/logout">logout</a>`)
    } else {
        res.send(`
                <h1>Welcome</h1>
                <a href="/auth/login">Login</a>
      `)
    }
})

app.get('/auth/logout', (req, res) => {

    delete req.session.displayName;
    req.session.save(()=>{
    res.redirect('/welcome');
    })

})



app.post('/auth/login', (req, res) => {
    var user = {
        username: 'namsoo',
        password: '123',
        displayName: 'namminsoo'
    };
    var uname = req.body.username;
    var pwd = req.body.password;
    if (uname == user.username && pwd == user.password) {
        req.session.displayName = user.displayName;
        req.session.save(()=>{
        res.redirect('/welcome');
        })

    } else {
        res.send('Who are you? <a herf="/auth/login>Login</a>"')
    }



})

app.get('/auth/login', (req, res) => {
    var output = `
  <h1>Login</h1>
  <form actuon="/auth/login" method="post">
    <p>
    <input type="text" name="username" placeholder="username">
    </p>
    <p>
    <input type="password" name="password" placeholder="password">
    </p>
    <p>
    <input type="submit">
    </p>
  </form>
  `;

    res.send(output);
})








app.listen(5005, function() {
    console.log('Conneted 5005 port');
});
