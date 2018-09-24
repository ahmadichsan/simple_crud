/** Server configuration */
const express = require('express')
const app = express()

/** Body parser configuration */
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/** Cors to make the server accessible */
const cors = require('cors');
app.use(cors());

/** Port configuration */
const env = require('./config/db/env')
const port = env.PORT;
app.listen(port, (req, res) =>{
  console.log(`Server started at port ${port}...`)
});

const category = require('./routes/category');
const product = require('./routes/product');
const product_category = require('./routes/product_category');
const product_code = require('./routes/product_code');
const login = require('./routes/login')

app.use(category)
app.use(product)
app.use(product_category)
app.use(product_code)
app.use(login)