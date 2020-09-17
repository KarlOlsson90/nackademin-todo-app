require("dotenv").config();
const app = require('./app')

const port = process.env.PORT || 5000 
const dbTest = require('./database/mongoDB')

app.listen(port, async () => {

    dbTest.connect();
  
  });

  console.log("Server running on port " + port + ";")