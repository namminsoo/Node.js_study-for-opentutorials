var express =require('express');
var app = express();


//
// router.use(function(req, res, next){
//   console.log('Time :', Date.now());
//   next();
// })


//라우트 분리 후==========
//var p1 = require('./routes/p1');
var p1 = require('./routes/p1')(app);//app변수 전달

app.use('/p1', p1);

//================

//라우트 분리 전 =================
var p2 =express.Router();

p2.get('/p2/r1', (req, res)=>{
  res.send('hello /p2/r1');
})
p2.get('/p2/r2', (req, res)=>{
  res.send('hello /p2/r2');
})

app.use('/p2', p2)
//========================


app.listen(5005, ()=>{
  console.log('connected');
})
