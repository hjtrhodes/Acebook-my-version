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
              displayName: activeUser.displayName, 
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
              comment.commenter = comment.displayName;
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

  Likes: (req, res) => {
    const newLike = req.body.likes;

    Post.findOneAndUpdate(
      { _id: req.params.id }, 
      { $inc: { likes: newLike } }, 
      { new: true }, 
      (err, updatedPost) => {
        if (err) {
          console.error('Like not added:', err);
          res.status(500).json({ message: 'Internal Server Error' });
        } else {
          const token = TokenGenerator.jsonwebtoken(req.user_id)
          res.status(201).json({ message: 'Like added successfully', token: token, updatedPost });
        }
      }
    );
  },


GetLikes: async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const likes = post.likes;
        const token = TokenGenerator.jsonwebtoken(req.user_id);
        res.status(200).json({ likes, token });
    } catch (err) {
        console.error('Error retrieving post likes:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
  }


};



module.exports = PostsController;
