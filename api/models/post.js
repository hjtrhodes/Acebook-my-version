const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  image: String, // Store the base64-encoded
  date: { type: Date, default: Date.now },
  likes: { type: [String], default: [] },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }],
});


const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
