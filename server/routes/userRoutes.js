let express = require("express");
let { userController, recipeController } = require("../controllers");
const { verifyToken } = require("../middleware/auth");

let router = express.Router();

router.post("/register", (req, res) => userController.registerUser(req, res));
router.post("/login", (req, res) => userController.loginUser(req, res));
router.put('/:id', verifyToken, (req, res) => userController.updateUser(req, res));

module.exports = router;
