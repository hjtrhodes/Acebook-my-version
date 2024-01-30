const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  image: String, // Store the base64-encoded
  date: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true
  },
  comments: [
    {
    comment_message: String,
  date: {
    type: Date,
    default: Date.now,
    },
  commenter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    },
    displayName: String,
  }
  ]
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
