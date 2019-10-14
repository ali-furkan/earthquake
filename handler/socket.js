var io = require("../index").io,
fs = require("fs"),
eqData = require("../data.json");

var x = 0

fs.watchFile("./data.json",()=>{
    delete require.cache[require.resolve("../data.json")];
    eqData = require("../data.json");
    x++
    if(x>1) io.emit("newEq",eqData[0]);
})


module.exports = () => {
    var usersN=0
    io.on("connection",(socket)=>{
        usersN++
        console.log(`Yeni kullanıcı giriş yaptı. id: ${socket.id}.\nAktif kullanıcı sayısı: ${usersN}`)
        socket.on("disconnect",()=>{
            usersN--
            console.log(`Bir kullanıcı çıkış yaptı. id: ${socket.id}.\nAktif kullanıcı sayısı: ${usersN}`)
        })
    })
}