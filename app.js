const mongoose = require('mongoose');
const express = require('express')
const app = express()
const port = 8080

mongoose.connect('mongodb://172.21.154.130:27017/testdb', {useNewUrlParser: true,useUnifiedTopology: true});

var db = mongoose.connection
  .on('open', () => {
    console.log('Mongoose connection open');
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });

console.log("Connected to Mongo");
console.log("Connected to Mongo"+db);


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







app.get('/', (req, res) => res.send('Hello Universe1'))
app.get('/two', (req, res) => res.send('Hello Universe2'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
