const { ObjectId } = require("mongodb");
const connectToMongoDB = require("../configs/db.config");

let db;

connectToMongoDB()
    .then((result) => {
        db = result;
    })
    .catch((err) => console.log(err));

console.log(db);

async function AddComment(data) {
    const comments = db.collection("comments");
    await comments.insertOne(data);
}

async function findComments() {
    const comments = db.collection("comments");
    const result = await comments.find();
    return result.toArray();
}

async function findCommentId(id) {
    const comments = db.collection("comments");
    const result = await comments.findOne({ _id: new ObjectId(id)});
    return result;
}

module.exports = {
    AddComment,
    findComments,
    findCommentId,
};