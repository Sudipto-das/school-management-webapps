
require('dotenv').config()
const app = require('./src/app.js')
const connectDB = require('./src/config/database.js')
const dns = require("dns");

// set custom DNS servers
dns.setServers(['8.8.8.8', '1.1.1.1']);


connectDB()
app.listen(7000,()=>{
    console.log("server is running on port 7000")
})
