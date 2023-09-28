let express = require("express");
let { recipeController } = require("../controllers")

let router = express.Router();

router.get("/", (_, res) => recipeController.getRecipes(res));
router.get("/:id", (req, res) => recipeController.getRecipe(req, res));
router.post("/:id", (req, res) => recipeController.createRecipe(req.body, res));
router.put("/:id", (req, res) => recipeController.updateRecipe(req, res));
router.delete("/:id", (req, res) => recipeController.deleteRecipe(req, res));

module.exports = router;