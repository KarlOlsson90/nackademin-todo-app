require("dotenv").config();
const app = require('./app')
const port = process.env.PORT || 5000 
const database = require('./database/mongoDB')

app.listen(port, async () => {
    database.connect();
  });

  console.log("Server running on port " + port + ";")