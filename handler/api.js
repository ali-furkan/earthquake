const bodyParser = require("body-parser"),
cors = require("cors"),
router = require("../controller/apiRouter")

module.exports = (app) => {
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(router)
}