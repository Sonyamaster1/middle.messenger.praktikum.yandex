require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.static(__dirname + '/dist'));
app.listen(process.env.PORT || 3000, function () {
  console.log(`Example app listening on port ${process.env.PORT || 3000}!`);
});
