const express = require('express');
const router = express.Router();
router.use(express.json());
const commentsController = require("../controllers/db.contr");

router.get('/', (req, res) => {
    res.status(200).send("Hello");
});

router.get("/comments", commentsController.getComments);

router.post("/comments", express.json(), commentsController.postAdd);

router.get("/comments/:id", commentsController.getCommentId);


module.exports = router;