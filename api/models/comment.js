const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    comment_message: String,
    date: { type: Date, default: Date.now },
    commenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    parentComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: null
    },
    children: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;

