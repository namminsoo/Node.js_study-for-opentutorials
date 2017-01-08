//express 사용
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

app.use(cookieParser('1q2w3e4r'));//인자값이 쿠키 키값

app.get('/count', (req, res) => {

    if (req.signedCookies.count) {
        var count = parseInt(req.signedCookies.count);
    } else {
        var count = 0;
    }
    count++;
    res.cookie('count', count, {signed:true});
    res.send('count : ' + count);
});

var products = {
    1: {
        title: 'The history of web 1'
    },
    2: {
        title: 'The next web'
    }
};

app.get('/products', (req, res) => {
    var output = '';

    for (var name in products) {
        output += `
    <li>
    <a href="/cart/${name}">${products[name].title}</a>
    </li>`
        //console.log(products[name].title);
    }
    //res.send('<ul>'+output+'</ul>')
    res.send(`<h1>products</h1>
  <ul>${output}</ul>
  <a href="/cart">Cart</a>
  `)
});


app.get('/cart', (req, res)=>{
  var cart =req.signedCookies.cart;
  if(!cart){
    res.rend('Empty!');
  }else{
    var output='';
    for(var id in cart){
      output+=`<li>${products[id].title} (${cart[id]})</li>`
    }
  }
  res.send(`
    <h1>Cart</h1>
    <ul>${output}</ul>
    <a href="/products">Products List</a>`);
});

/*
cart={
1:2,
2:1
}
*/
app.get('/cart/:id', (req, res) => {
    var id = req.params.id;

    if (req.signedCookies.cart) {
        var cart = req.signedCookies.cart;
    } else {
        var cart = {};
    }
    if (!cart[id]) {
        cart[id] = 0;
    }
    cart[id] = parseInt(cart[id]) + 1;

    res.cookie('cart', cart,{signed:true});
    res.redirect('/cart');
})


app.listen(5005, function() {
    console.log('Conneted 5005 port');
});
