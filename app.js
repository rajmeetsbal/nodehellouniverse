const mongoose = require('mongoose');
const express = require('express')
const app = express()
const port = 8080

mongoose.connect(mongodb://172.21.154.130:27017/testdb, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection
  .on('open', () => {
    console.log('Mongoose connection open');
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  });


app.get('/', (req, res) => res.send('Hello Universe2'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
