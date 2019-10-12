const express = require("express"),
app = express(),
PORT = process.env.PORT||process.argv[2]||8080;
var server = app.listen(PORT,()=>{
    console.log("Connected via "+PORT+" PORT")
})

var io = module.exports.io = require("socket.io")(server)

require("./handler/api")(app)
require("./handler/socket")(io)
require("./handler/eqC")()