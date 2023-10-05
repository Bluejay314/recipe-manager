let express = require("express");
let { aiController } = require("../controllers");

let router = express.Router();

router.post("/ingredients", (req, res) => aiController.ingredientsResponse(req, res));
router.post("/method", (req, res) => aiController.methodResponse(req, res));
router.post("/description", (req, res) => aiController.descriptionResponse(req, res));

module.exports = router;
