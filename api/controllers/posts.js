const Post = require("../models/post");
const User = require("../models/user");
const TokenGenerator = require("../lib/token_generator");

const PostsController = {

  getAllPosts: (req, res) => {
    Post.find()
      .populate('author') // Populate the author field
      .populate({
        path: 'comments',
        populate: {
          path: 'commenter parentComment children',
          populate: {
            path: 'commenter',
            model: 'User'
          }
        }
      }) // Populate the comments field and its nested fields
      .exec((err, posts) => {
        if (err) {
          throw err;
        }
        const token = TokenGenerator.jsonwebtoken(req.user_id);
        res.status(200).json({ posts: posts, token: token });
      });
  },
  


  getAllPostsByAuthorId: (req, res) => {
    const author = req.params.authorId;
    Post.find({ author: author })
      .populate('author') // Populate the author field
      .populate({
        path: 'comments',
        populate: {
          path: 'commenter parentComment children',
          populate: {
            path: 'commenter',
            model: 'User'
          }
        }
      })
      .exec((err, posts) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        const token = TokenGenerator.jsonwebtoken(req.user_id);
        res.status(200).json({ posts: posts, token: token });
      });
  },
  

  IndexLoggedInUser: (req, res) => {
    const author = req.user_id;
    Post.find({ author: author })
        .populate('author') // Populate the author field
        .populate({
            path: 'comments',
            populate: {
                path: 'commenter parentComment children',
                populate: {
                    path: 'commenter',
                    model: 'User'
                }
            }
        }) // Populate the comments
        .exec((err, posts) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            const token = TokenGenerator.jsonwebtoken(req.user_id);
            res.status(200).json({ posts: posts, token: token });
        });
},


  CreatePostandAddImage: (req, res) => {
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
      
        res.status(201).json({ message, updatedPost });
    } catch (err) {
        console.error("Error updating likedByUser:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
},

GetLikes: async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.params.userId;
    
    // Retrieve the post with the given postId
    const post = await Post.findById(postId);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if the userId is in the likes array of the post
    const likedByUserIndex = post.likes.indexOf(userId);
    let likedByUser = false; // Initialize likedByUser to false
    
    if (likedByUserIndex !== -1) {
      likedByUser = true; // If found, set likedByUser to true
    }

    // Get the total number of likes
    const likes = post.likes.length;

    // Return the number of likes and whether the user has liked the post
    res.status(200).json({ likes, likedByUser });

  } catch (err) {
    console.error("Error retrieving post likes:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
},

  DeletePost: async (req, res) => {
  const { postId } = req.params;

  try {
      // Find the post by ID
      const post = await Post.findById(postId);
      if (!post) {
          return res.status(404).json({ error: 'Post not found' });
      }

      // Delete the post from the database
      await post.remove();
      res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ error: 'Failed to delete post' });
  }
},


};
  
  module.exports = PostsController;
