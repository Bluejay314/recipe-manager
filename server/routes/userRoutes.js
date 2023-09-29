let express = require("express");
let { userController } = require("../controllers");

let router = express.Router();

router.get("/:id", (req, res) => userController.getUser(req, res));
router.post("/register", (req, res) => userController.registerUser(req, res));
router.post("/login", (req, res) => userController.loginUser(req, res));
router.put('/:id', (req, res) => userController.updateUser(req, res));
router.delete("/:id", (req, res) => userController.deleteUser(req, res));

module.exports = router;
