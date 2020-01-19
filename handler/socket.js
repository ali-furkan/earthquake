var io = require("../index").io,
fs = require("fs"),
eqData = require("../data.json");
const {Expo} = require("expo-server-sdk")

var users = []
let expo = new Expo()
var pushNotf = async msg=>await expo.sendPushNotificationsAsync(expo.chunkPushNotifications(msg)[0])
var x =0;
fs.watchFile("./data.json",()=>{
    delete require.cache[require.resolve("../data.json")];
    eqData = require("../data.json");
    if(x==0) return x++
    console.log("Deprem oldu")
    io.emit("newEq",eqData[0]);
    users.forEach(async user => {
       await pushNotf([{
            to: user.token,
            sound: "default",
            title: eqData[0].location.Region+" -Deprem Oldu",
            android: {
                color: "#fff",
                icon: eqData[0].img,
            },
            body: `Büyüklük: ${eqData[0].mag.size} Derinlik: ${eqData[0].mag.depth}`
        }])
    });
})

module.exports = () => {
    var usersN=0
    io.on("connection",(socket)=>{
        usersN++
        socket.on("signin",token=>{
            users.push({id: socket.id,token})
            console.log("SignIn")
        })
        console.log(`Yeni kullanıcı giriş yaptı. id: ${socket.id}.\nAktif kullanıcı sayısı: ${usersN}`)
        socket.on("disconnect",()=>{
            usersN--
            console.log(`Bir kullanıcı çıkış yaptı. id: ${socket.id}.\nAktif kullanıcı sayısı: ${usersN}`)
        })
    })
}