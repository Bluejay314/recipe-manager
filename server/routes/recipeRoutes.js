let express = require("express");
let { recipeController } = require("../controllers");
const { uploadFile } = require("../middleware/uploads");

let router = express.Router();

router.get("/:id", (req, res) => recipeController.getRecipe(req, res));
router.post("/", (req, res) => recipeController.createRecipe(req.body, res));
router.post('/:userId/image/', uploadFile, (req, res) => recipeController.createRecipeImage(req, res));
router.put("/:id", (req, res) => recipeController.updateRecipe(req, res));
router.delete("/:id", (req, res) => recipeController.deleteRecipe(req, res));

module.exports = router;