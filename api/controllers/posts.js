const Post = require("../models/post");
const User = require("../models/user");
const TokenGenerator = require("../lib/token_generator");

const PostsController = {

  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      //console.log(posts);
      res.status(200).json({ posts: posts, token: token });
    });
  },

  IndexByAuthorId: (req, res) => {
    const author = req.params.authorId;
    Post.find({ author: author }).exec((err, posts) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ posts: posts, token: token });
    });
  },

  IndexLoggedInUser: (req, res) => {
    // req.user_id is ALWAYS the id of the *logged in user*.
    // Therefore this function ALWAYS finds the posts
    // of the *logged in user*.
    // Therefore I have renamed this function
    // from `IndexByUserId` to `IndexLoggedInUser`.
    const author = req.user_id;
    Post.find({ author: author }, (err, posts) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ posts: posts, token: token });
    });
  },

  Create: (req, res) => {
    try {
      const author = req.user_id; 
      const { message } = req.body;
      const imageBuffer = req.file ? req.file.buffer : null;  

      let imageUrl = null;
      if (imageBuffer) {
        const base64Image = imageBuffer.toString('base64'); 
        imageUrl = base64Image;
      }

      const post = new Post({
        ...req.body,
        message,
        image: imageUrl,
        author: author
      });

      post.save();

      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: 'OK', token });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      };
    },

  Comment: async (req, res) => {
    console.log("COMMENTING");
    console.log(req.params.id);
    const newComment = req.body.comment;

    try {
      const activeUser = await User.findById(req.user_id);
      if (!activeUser) {
        throw new Error("User not found");
      }

      Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: {
            comments: {
              comment_message: newComment,
              firstName: activeUser.firstName,
              lastName: activeUser.lastName, 
              commenter: req.user_id
            },
          },
        },
        { new: true },
        (err, updatedPost) => {
          if (err) {
            console.error('Error adding comment:', err);
            res.status(500).json({ message: 'Internal Server Error' });
          } else {
            console.log('Comment added successfully');
            const token = TokenGenerator.jsonwebtoken(req.user_id);
            updatedPost.comments.forEach(comment => {
              comment.commenter = comment.firstName, comment.lastName;
            });
            console.log(updatedPost);
            res.status(201).json({ message: 'Comment added successfully', token: token, updatedPost });
          }
        }
      );
    } catch (error) {
      console.error("Error fetching user information:", error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  AddOrRemoveUserIDFromPostLikesArray: async (req, res) => {
    const postId = req.params.id;
    const userId = req.body.userId;
    
    try {
        // Find the post by ID
        const post = await Post.findById(postId);
      
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
      
        // Check if the user has already liked the post
        const likedByUserIndex = post.likes.indexOf(userId);
        if (likedByUserIndex === -1) {
            // If not found, add the user ID to the likedByUser array
            post.likes.push(userId);
        } else {
            // If found, remove the user ID from the likedByUser array
            post.likes.splice(likedByUserIndex, 1);
        }
        // Save the updated post
        const updatedPost = await post.save();
      
        // Return the appropriate response
        const message = likedByUserIndex === -1 ? true : false;
        const likes = post.likes.length;
      
        res.status(201).json({ message, updatedPost, likes });
    } catch (err) {
        console.error("Error updating likedByUser:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
},


  
};
  
  module.exports = PostsController;
