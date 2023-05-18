const commentServices = require('../services/db.serv');
const { ObjectId } = require('mongodb');

async function getComments(req, res) {
    let allComments = await commentServices.findComments()
    res.json(allComments)
}

async function getCommentId(req, res) {
    if (ObjectId.isValid(req.params.id)) {
        let comment = await commentServices.findCommentId(req.params.id)
        res.json(comment)
    } else {
        res.status(404).send("Not Found")
    }
}

async function postAdd(req, res, next) {
    const createdAt = new Date();
    const { name, text } = req.body;
    if (!name || !text){
        err = new Error("Неверные данные в комментарии");
    }
    try{
        commentServices.AddComment({ name, text, createdAt });
        let allComments = await commentServices.findComments();
        res.json(allComments);
    }
    catch(err){
        res.statusCode = 500;
        next(err);
    }
}

module.exports = {
    getComments,
    postAdd,
    getCommentId
}