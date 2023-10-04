let express = require("express");
let { aiController } = require("../controllers");

let router = express.Router();

router.get("/ingredients", (req, res) => aiController.getIngredientsChange(req, res));

module.exports = router;
