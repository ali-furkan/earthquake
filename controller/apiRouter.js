const express = require("express"),
controller = require("./apiController"),
router = express.Router();

router.get("/api/ping",(req,res)=>{
    res.send({pong:true})
})

router.get("/api/eq",controller.getEq)

module.exports = router;