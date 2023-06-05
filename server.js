const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('./dist/')); 

const Handlebars = require("handlebars");
const template = Handlebars.compile("Name: {{name}}");
console.log(template({ name: "Nils" }));


app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
}); 

