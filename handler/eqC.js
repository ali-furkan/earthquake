const fs = require("fs")
var MData = require("../data.json")
const axios = require("axios").default,
jsdom = require("jsdom"),
{JSDOM} = jsdom;

var URL = module.exports.URL =  (n) => `http://sc3.koeri.boun.edu.tr/eqevents/events${!n?"":n!=0?n:""}.html`

const getNodes = html => {
    var dom = new JSDOM(html),
    eqs = dom.window.document.querySelectorAll("td"),
    eqsTr = dom.window.document.querySelectorAll("tr"),
    data = []
    for(var i=0;i<eqs.length-5;i+=10) {
        var x = eqsTr[(i/10)+1].getAttribute("onclick").split("'")[1].split("/")[1]
        data.push({
            id: Math.floor(Math.random()*999999999999),
            time: eqs[i].textContent,
            mag: {
                size: eqs[i+1].textContent,
                type: eqs[i+2].textContent,
            },
            location: {
                Region: eqs[i+6].textContent,
                latitude: eqs[i+3].textContent,
                longitude: eqs[i+4].textContent
            },
            depth: eqs[i+5].textContent,
            img: `http://sc3.koeri.boun.edu.tr/eqevents/event/${x}/${x}-map.jpeg`
        })
    }
    return data
},

getEqs = async () => {
    var data = []
    for(var i=0;i<34;i++) {
        await axios.get(URL(i))
        .then(res=>{
            data = [...data,...getNodes(res.data)]
        })
    }
    return data
};

var x = () => setInterval(async ()=>{
    await axios.get(URL())
    .then(res=>{
        if(JSON.stringify(getNodes(res.data)[0].time)==JSON.stringify(MData[0].time)) return;
        getEqs()
        .then(data=>{
            MData=data;
            fs.writeFileSync("./data.json",JSON.stringify(MData))
            require("./socket").changeD()
        })
    })
},30*1000)

module.exports = () => {
    axios.get(URL())
    .then(res=>{
        if(MData.length>0&&JSON.stringify(getNodes(res.data)[0].time)==JSON.stringify(MData[0].time)) return;
        getEqs()
        .then(data=>{
            MData=data;
            fs.writeFileSync("./data.json",JSON.stringify(MData))
        })
    })
    x()
}