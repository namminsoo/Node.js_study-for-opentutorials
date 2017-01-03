//express 사용
var express = require('express');
var app = express();

//미들웨어, POST를 하기 위해
var bodyParser = require('body-parser');

//jade 코드를 이쁘게 표현하는 설정
app.locals.pretty = true;

//템플릿 엔진 셋팅
app.set('view engine', 'jade');
app.set('views', './views');//폴더명

//정적인 코드
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//query 예제
app.get('/topic', function(req, res) {
  var topics =[
    'javascript is....',
    'Nodejs is....',
    'Express is...'
  ];
  var output =`
<a href="/topic?id=0">javascript</a><br>
<a href="/topic?id=1">Nodejs</a><br>
<a href="/topic?id=2">Express</a><br><br>
${topics[req.query.id]}
  `
  res.send(output);
});
//req 요청, res 응답

//topic/2 이런식으로 값 전달 Semantic URL
app.get('/topic2/:id', function(req, res) {
  var topics =[
    'javascript is....',
    'Nodejs is....',
    'Express is...'
  ];
  var output =`
<a href="/topic?id=0">javascript</a><br>
<a href="/topic?id=1">Nodejs</a><br>
<a href="/topic?id=2">Express</a><br><br>
${topics[req.params.id]}
  `
  res.send(output);
});

//시멘틱 url , restful api랑 연결됨
app.get('/topic/:id/:mode', function(req, res){
  res.send(req.params.id+', '+req.params.mode);
});

//GET POST
app.get('/form', function(req, res){
  res.render('form');
});
//GET
app.get('/form_receiver', function(req, res){
  var title = req.query.title;
  var description = req.query.description;

  res.send(title +', '+description);
} );

//POST
app.post('/form_receiver', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  res.send(title+', '+description);
  //res.send('Hello POST');
});

//get url에 정보를 나타낼 때
//post 숨길려 할 때, 로그인, 내용이 엄청 길 때
//보안 높은거 https, ssl




app.get('/template', function(req, res){
  //res.render('temp', {time:'hello'});
  res.render('temp', {time:Date(), _title:'Jade'});
});

app.get('/', function(req, res){
  res.send('Hello home page');
});

//동적인 코드
app.get('/dynamic', function(req, res) {
  var lis ='';
  for(var i=0;i<5;i++)
  {
    lis=lis+'<li>coding</li>';
  }
  var time =Date();
  var output=`
  <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title></title>
      </head>
      <body>
          Hello, Dynamic
          <ul>
          ${lis}
          </ul>
          ${time}
      </body>
    </html>
`
  res.send(output);
});
app.get('/login', function(req, res){
  res.send('login please');
});

app.listen(3000, function(){
  console.log('Conneted 3000 port');
});
