//express 사용
var express = require('express');
var app = express();
var fs = require('fs');
var multer = require('multer');

var _storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname + '-' + Date.now())
    }
});

//DB 연결
var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'MYSQL5014.SmarterASP.NET',
    user: 'a14696_nodejs',
    password: '1q2w3e4r',
    database: 'db_a14696_nodejs'
});

conn.connect();

var upload = multer({
    storage: _storage
}); //미들웨어, 저장될 위치 지정

//미들웨어, POST를 하기 위해
var bodyParser = require('body-parser');

//jade 코드를 이쁘게 표현하는 설정
app.locals.pretty = true;

//템플릿 엔진 셋팅
app.set('view engine', 'jade');
app.set('views', './views_mysql'); //폴더명

//정적인 코드
app.use(express.static('public'));
app.use('/user', express.static('uploads')); //127.0.0.1:5000/user/123.png

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));






//file upload
app.get('/upload', function(req, res) {
    res.render('upload');
});
app.post('/upload', upload.single('userfile'), function(req, res) {
    console.log(req.file);
    res.send('upload' + req.file);
});




app.get('/topic/add', function(req, res) {
    var sql = 'SELECT id, title FROM topic';
    conn.query(sql, function(err, topics, fields) {

        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error!');
        } else {
            res.render('add', {
                topics: topics
            });
        }
    });

    //파일
    // fs.readdir('data', function(err, files) {
    //     if (err) {
    //         res.status(500).send('Internal Server Error!');
    //     }
    //     res.render('add', {
    //         topics: files
    //     });
    // })
});

app.post('/topic/add', function(req, res) {
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;

    var sql = 'INSERT INTO topic(title, description, author) VALUES(?,?,?)';
    conn.query(sql, [title, description, author], function(err, result, fields) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error!');
        } else {
            res.redirect('/topic/' + result.insertId);
        }


        //
        // fs.writeFile('data/' + title, description, function(err) {
        //     if (err) {
        //         res.status(500).send('Internal Server Error!');
        //     }
        //     //페이지 보내기
        //     res.redirect('/topic/' + title);
        // });

        //res.send('hi post'+title+description);
    });
});







app.get('/topic/:id/edit', function(req, res) {
    var sql = 'SELECT id, title FROM topic';
    conn.query(sql, function(err, topics, fields) {
        var id = req.params.id;
        if (id) {
            var sql = 'SELECT * FROM topic WHERE id=?';
            conn.query(sql, [id], function(err, topic, fields) {
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error!');
                } else {
                    res.render('edit', {
                        topics: topics,
                        topic: topic[0]
                    });
                }
            });
        } else {
            console.log('There is no id');
            res.status(500).send('Internal Server Error!');
        }
    });
});

app.post(['/topic/:id/edit'], (req, res) => {
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;
    var id = req.params.id;
    var sql = 'UPDATE topic SET title=?, description=?, author=? WHERE id =?';

    conn.query(sql, [title, description, author, id], (err, result, fiedls) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error!');
        } else {
            res.redirect('/topic/' + id)
        }
    })
})



app.get('/topic/:id/delete', (req, res) => {
    var id = req.params.id;

    var sql = 'SELECT id, title FROM topic';
    conn.query(sql, function(err, topics, fields) {

        var sql = 'SELECT * FROM topic WHERE id=?';
        conn.query(sql, [id], function(err, topic, fields) {
            if (err) {
                console.log(err);
                res.status(500).send('Internal Server Error!');
            } else {
                if (topic.length != 0) {
                    res.render('delete', {
                        topics: topics,
                        topic: topic[0]
                    });
                }
            }
        });
    });
});

app.post('/topic/:id/delete', (req, res)=>{
  var id = req.params.id;
  var sql='DELETE FROM topic WHERE id=?';

  conn.query(sql, id,(err, result)=>{
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error!');
    }else{
      //res.send(result);
      res.redirect('/topic');
    }
  })
});







app.get(['/topic', '/topic/:id'], function(req, res) {
    var sql = 'SELECT id, title FROM topic';
    conn.query(sql, function(err, topics, fields) {
        var id = req.params.id;
        if (id) {
            var sql = 'SELECT * FROM topic WHERE id=?';
            conn.query(sql, [id], function(err, topic, fields) {
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error!');
                } else {
                    res.render('view', {
                        topics: topics,
                        topic: topic[0]
                    });
                }
            });
        } else {
            res.render('view', {
                topics: topics
            });
        }
    });


    //폴더 파일 코드
    // fs.readdir('data', function(err, files){
    //   if(err){
    //     console.log(err);
    //     res.status(500).send('Internal Server Error!');
    //   }
    //   //id 값이 있을 때
    //   var id =req.params.id;
    //   if(id)
    //   {
    //   fs.readFile('data/'+id, function(err, data){
    //     if(err)
    //     {
    //         res.status(500).send('Internal Server Error!');
    //     }
    //       res.render('view', {title:id, topics:files, description:data});
    //   });
    //   }
    //   else{
    //     //id가 없을 때
    //   res.render('view',{topics:files,  title:'welcome', description:'hihihi'});
    // }
    // })
});





app.listen(5000, function() {
    console.log('Conneted 5000 port');
});
