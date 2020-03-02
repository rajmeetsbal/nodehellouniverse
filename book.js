var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
   name: String,
   price: Number,
   quantity: Number
});
module.exports = mongoose.model('book', bookSchema);    
