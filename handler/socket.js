var io = require("../index").io,
fs = require("fs"),
eqData = require("../data.json");

fs.watchFile("./data.json",()=>{
    delete require.cache[require.resolve("../data.json")];
    eqData = require("../data.json");
    io.emit("NewEq",eqData[0])
})

var usersN=0

module.exports = () => {
    io.on("connection",(socket)=>{
        usersN++
        console.log(`Yeni kullanıcı giriş yaptı. id: ${socket.id}.\nAktif kullanıcı sayısı: ${usersN}`)
        socket.on("disconnect",()=>{
            usersN--
            console.log(`Bir kullanıcı çıkış yaptı. id: ${socket.id}.\nAktif kullanıcı sayısı: ${usersN}`)
        })
    })
}