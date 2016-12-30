var fs = require('fs');

//동기 Sync
console.log(1);
var data = fs.readFileSync('data.txt', {encoding:'utf8'});
console.log(data);


//비동기 Async
console.log(2);
fs.readFile('data.txt', {encoding:'utf8'}, function(err, data2){
  console.log(3);
  console.log(data2);
});
console.log(4);
