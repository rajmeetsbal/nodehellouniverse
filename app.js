const mongoose = require('mongoose');
const express = require('express')
var Book = require('./book.js');
const app = express()
const port = 8080

mongoose.connect('mongodb://rajmeet:rajmeet@172.21.154.130:27017/testdb', {useNewUrlParser: true,useUnifiedTopology: true});


var db = mongoose.connection
	  .on('open', () => {
		console.log('Mongoose connection open');
	  })
	  .on('error', (err) => {
		console.log(`Connection error: ${err.message}`);
	  });


db.once('open', function() {
    console.log("Connection Successful!");
    var book1 = new Book({ name: 'Introduction to maqaa', price: 901, quantity: 93 });
    book1.save(function (err, book) {
      if (err) return console.error(err);
      console.log(book.name + " saved to bookstore collection.");
    });
}); 


app.post('/test', function (req, res) {
  res.send('POST request happened')
})

app.post("/add", function (req, res) {
		console.log("adding....");
		var n = Math.random();
		var book1 = new Book({ name: 'Introduction to Mongoose'+n, price: 10+n, quantity: 25+n });
		book1.save(function (err, book) {
		  if (err) 
			  return console.error(err);
		  console.log("saved...."+book);
		  res.send(book);
		});
		console.log("finishing....");
});

/*
app.post("/add", function (req, res) {
		console.log("adding....");
		var n = Math.random();
		var book1 = new Book({ name: 'Introduction to Mongoose'+n, price: 10+n, quantity: 25+n });
		book1.save(function (err, book) {
		  if (err) return console.error(err);
		  console.log(book.name + " saved to bookstore collection.");
		  res.send(book.name + " saved to bookstore collection.");
		});
		console.log("finishing....");
});
*/

app.get("/show", function (req, res) {
	console.log("showing....");
	Book.find({}, function(error, books) {
		console.log(books);
		res.send(books);
	});
	console.log("finishing....");
});

app.get('/', (req, res) => res.send('Hello Universe1'));
app.get('/two', (req, res) => res.send('Hello Universe2'));




app.listen(port, () => console.log(`Example app listening on port ${port}!`))
