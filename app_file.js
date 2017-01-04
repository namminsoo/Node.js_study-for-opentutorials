//express 사용
var express = require('express');
var app = express();
var fs =require('fs');
var multer = require('multer');

var _storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now())
  }
})
var upload = multer({storage:_storage});//미들웨어, 저장될 위치 지정

//미들웨어, POST를 하기 위해
var bodyParser = require('body-parser');

//jade 코드를 이쁘게 표현하는 설정
app.locals.pretty = true;

//템플릿 엔진 셋팅
app.set('view engine', 'jade');
app.set('views', './views_file');//폴더명

//정적인 코드
app.use(express.static('public'));
app.use('/user',express.static('uploads'));//127.0.0.1:5000/user/123.png

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));






//file upload
app.get('/upload', function(req, res){
  res.render('upload');
});
app.post('/upload',upload.single('userfile'), function(req, res){
  console.log(req.file);
  res.send('upload'+req.file);
});




app.get('/topic/new', function(req, res){
  fs.readdir('data', function(err, files){
    if(err){
      res.status(500).send('Internal Server Error!');
    }
    res.render('new', {topics:files});
  })
});

app.get(['/topic','/topic/:id'], function(req, res){
  fs.readdir('data', function(err, files){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error!');
    }
    //id 값이 있을 때
    var id =req.params.id;
    if(id)
    {
    fs.readFile('data/'+id, function(err, data){
      if(err)
      {
          res.status(500).send('Internal Server Error!');
      }
        res.render('view', {title:id, topics:files, description:data});
    });
    }
    else{
      //id가 없을 때
    res.render('view',{topics:files,  title:'welcome', description:'hihihi'});
  }
  })
});


app.post('/topic', function(req, res){
  var title = req.body.title;
  var description = req.body.description;

  fs.writeFile('data/'+title, description, function(err){
    if(err){
      res.status(500).send('Internal Server Error!');
    }
    //페이지 보내기
    res.redirect('/topic/'+title);
  });

  //res.send('hi post'+title+description);
});




app.listen(5000, function(){
  console.log('Conneted 5000 port');
});
