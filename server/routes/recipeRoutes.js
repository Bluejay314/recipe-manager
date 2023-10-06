let express = require("express");
let { recipeController } = require("../controllers");
const { uploadFile } = require("../middleware/uploads");
const { verifyToken } = require("../middleware/auth");

let router = express.Router();

// Get all recipes tied to a user
router.get("/all/:id", verifyToken, (req, res) => recipeController.getUserRecipes(req, res));

// Get all recipes tied to a user that matches the search parameter
router.get("/:id/search/:q", (req, res) => recipeController.searchRecipes(req, res));

// Get all recipes tied to a user marked as favourite
router.get("/:id/favourites", (req, res) => recipeController.getFavourites(req, res));

// Get one recipe with regards to its ID
router.get("/:id", (req, res) => recipeController.getRecipe(req, res));

// Create a new recipe for a user. If an image is present, perform /createRecipeImage' as well
router.post("/:id",uploadFile, (req, res) => recipeController.createRecipe(req, res));

// Get one recipe with regards to its ID and update with the body information
router.put("/update/:id", (req, res) => recipeController.updateRecipe(req, res));

// Upload an image to the public folder and add the path to the recipe image field
router.put('/:id/image', uploadFile, (req, res) => recipeController.createRecipeImage(req, res));

// Delete a recipe given its ID
router.delete("/:id", (req, res) => recipeController.deleteRecipe(req, res));

module.exports = router;