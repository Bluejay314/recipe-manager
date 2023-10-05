let express = require("express");
let { recipeController } = require("../controllers");
const { uploadFile } = require("../middleware/uploads");
const { verifyToken } = require("../middleware/auth");

let router = express.Router();

router.get("/all/:id", verifyToken, (req, res) => recipeController.getUserRecipes(req, res));
router.get("/:id/search/:q", (req, res) => recipeController.searchRecipes(req, res));
router.get("/:id/favourites", (req, res) => recipeController.getFavourites(req, res));
router.get("/:id", (req, res) => recipeController.getRecipe(req, res));

router.post("/:id",uploadFile, (req, res) => recipeController.createRecipe(req, res));

router.put("/update/:id", (req, res) => recipeController.updateRecipe(req, res));
router.put('/:id/image', uploadFile, (req, res) => recipeController.createRecipeImage(req, res));

router.delete("/:id", (req, res) => recipeController.deleteRecipe(req, res));

module.exports = router;