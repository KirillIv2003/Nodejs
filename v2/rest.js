const express = require('express');
const router = express.Router();
router.use(express.json());
const commentsController = require("../controllers/db.contr");
const apiController = require("../controllers/Api.contr");
const modelsController = require("../controllers/Models.contr");

router.get('/', (req, res) => {
    res.status(200).send("Hello");
});


// Api
router.post("/login", apiController.getApi);
router.delete("/logout", apiController.deleteApi);

// Models
router.get("/models", modelsController.getAllModels);
router.get("/models/:id", modelsController.getModelId);

router.post("/models", apiController.checkApi, modelsController.addModel);
router.put("/models/:id", apiController.checkApi, modelsController.updateModel);
router.delete("/models/:id", apiController.checkApi, modelsController.deleteModelId);

//comments
router.get("/comments", commentsController.getComments);
router.post("/comments", express.json(), commentsController.postAdd);
router.get("/comments/:id", commentsController.getCommentId);


module.exports = router;