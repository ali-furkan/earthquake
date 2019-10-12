var fs = require("fs")
var eqData = require("../data.json");

fs.watchFile("./data.json",()=>{
    delete require.cache[require.resolve("../data.json")];
    eqData = require("../data.json");
})

module.exports.getEq = (req,res) => {
    res.type("json")
    var size = req.query.size?parseInt(req.query.size):20
    var begin = req.query.begin?parseInt(req.query.begin):0
    //console.log(`${begin}-${eqData[begin].id} ${size+begin}-${eqData[begin+size].id}`)
    res.send(eqData.slice(begin,size+begin))
}