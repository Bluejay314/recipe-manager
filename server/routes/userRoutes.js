let express = require("express");
let { userController, recipeController } = require("../controllers");
const { verifyToken } = require("../middleware/auth");

let router = express.Router();

// Create a new user with information from the body
router.post("/register", (req, res) => userController.registerUser(req, res));

// Login a user with the details provided in the body
router.post("/login", (req, res) => userController.loginUser(req, res));

// Update details of a user. User must be logged in to update.
router.put('/:id', verifyToken, (req, res) => userController.updateUser(req, res));

module.exports = router;
