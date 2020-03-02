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

console.log("Connected to Mongo");

/*
db.once('open', function() {
    console.log("Connection Successful!");
    
    // define Schema
    var BookSchema = mongoose.Schema({
      name: String,
      price: Number,
      quantity: Number
    });
 
    // compile schema to model
    var Book = mongoose.model('Book', BookSchema, 'bookstore');
 
    // a document instance
    var book1 = new Book({ name: 'Introduction to Mongoose', price: 10, quantity: 25 });
 
    // save model to database
    book1.save(function (err, book) {
      if (err) return console.error(err);
      console.log(book.name + " saved to bookstore collection.");
    });
    
}); 
*/



app.post("/add", function (req, res) {
	
 
    // save model to database
//	db.once('open', function() {
		var n = Math.random();
		var BookSchema = mongoose.Schema({
		  name: String,
		  price: Number,
		  quantity: Number
		});
	 
		// compile schema to model
		var Book = mongoose.model('Book', BookSchema, 'bookstore');
	 
		// a document instance
		var book1 = new Book({ name: 'Introduction to Mongoose'+n, price: 10+n, quantity: 25+n });
		book1.save(function (err, book) {
		  if (err) return console.error(err);
		  console.log(book.name + " saved to bookstore collection.");
		});
//	});
});

app.get("/show", function (req, res) {
	var BookSchema = mongoose.Schema({
      name: String,
      price: Number,
      quantity: Number
    });
 
    // compile schema to model
    var Book = mongoose.model('Book', BookSchema, 'bookstore');
 
	Book.find({}, function(error, books) {
		console.log(books); //Display the comments returned by MongoDB, if any were found. Executes after the query is complete.
		res.send(books);
	});
});


app.get("/books", function (req, res) {
	db.on('error', console.error.bind(console, 'connection error:'));
	var a1= db.once('open',function(){
	  Book.find({},function (err, books) {
		mongoose.connection.close();
		console.log("books supplied"+books);
		res.send(books);
		//doSomethingHere 
	  })
	});
});




app.get('/', (req, res) => res.send('Hello Universe1'));
app.get('/two', (req, res) => res.send('Hello Universe2'));




app.listen(port, () => console.log(`Example app listening on port ${port}!`))
