const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Add this line
// const apiRoutes = require('./route/code.route');
const router = require('./route/code.route');
const { connection } = require('./db');
require("dotenv").config();
const cors=require("cors")
const app = express();
const PORT = process.env.PORT || 3001;

// app.use(bodyParser.json());
app.use(cors())
// Serve the React app
// app.use(express.static(path.join(__dirname, '../client/build')));

app.use("/",router);

app.listen(PORT, async() => {
  try {
    await connection
  } catch (error) {
    
  }
  console.log(`Server is running on port ${PORT}`);
});
