/** Server configuration */
const express = require('express')
const app = express()

/** Body parser configuration */
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const cors = require('cors');
app.use(cors());

/** Port configuration */
const port = process.env.PORT || 8080;
app.listen(port, (req, res) =>{
  console.log(`Server started at port ${port}...`)
});

const category = require('./routes/category');
const product = require('./routes/product');

app.use(category)
app.use(product)