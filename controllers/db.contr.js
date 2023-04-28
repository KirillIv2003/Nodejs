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

async function postAdd(req, res) {
    const createdAt = new Date();
    const { name, text } = req.body;
    commentServices.AddComment({ name, text, createdAt });
    let allComments = await commentServices.findComments()
    res.json(allComments)
}

module.exports = {
    getComments,
    postAdd,
    getCommentId
}