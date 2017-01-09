// var express =require('express');
// var route = express.Router();
//
// route.get('/r1', (req, res)=>{
//   res.send('hello /p1/r1');
// })
//
// route.get('/r2', (req, res)=>{
//   res.send('hello /p1/r2');
// })

//module.exports = route;
//독립되게 분리=============================

//app 전달 받은 법=================================
module.exports = function(app){
  var express =require('express');
  var route = express.Router();

  route.get('/r1', (req, res)=>{
    res.send('hello /p1/r1');
  })

  route.get('/r2', (req, res)=>{
    res.send('hello /p1/r2');
  })

//app 변수를 활용 할 수 있음.

  return route;
};
