const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");
const TokenGenerator = require("../lib/token_generator");

const CommentsController = {
    CreateComment: async (req, res) => {
        try {
            const postId = req.params.postId;
            const { comment_message } = req.body;

            // Check if comment_message is empty
            if (!comment_message || comment_message.trim() === '') {
                return res.status(400).json({ message: 'Comment message cannot be empty' });
            }

            // Find the active user
            const activeUser = await User.findById(req.user_id);
            if (!activeUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Create a new comment
            const newComment = new Comment({
                comment_message,
                commenter: req.user_id,
            });

            // Save the new comment
            await newComment.save();

            // Populate the commenter field with user information
            await newComment.populate('commenter').execPopulate();

            // Update the corresponding post's comments array
            const post = await Post.findById(postId);
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            // Add the new comment's ID to the post's comments array
            post.comments.push(newComment._id);
            await post.save();

            // Send response
            const token = TokenGenerator.jsonwebtoken(req.user_id)
            return res.status(201).json({ message: 'Comment added successfully', newComment, token: token });
        } catch (error) {
            console.error('Error creating comment:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    },


    // CreateChildComment: async (req, res) => {
    //     try {
    //         const parentCommentId = req.params.id; // Assuming you receive the parent comment ID in the request params
    //         const { comment_message } = req.body;

            
    //         // Check if comment_message is empty
    //         if (!comment_message || comment_message.trim() === '') {
    //             return res.status(400).json({ message: 'Comment message cannot be empty' });
    //         }
            
    //         // Find the active user
    //         const activeUser = await User.findById(req.user_id);
    //         if (!activeUser) {
    //             return res.status(404).json({ message: 'User not found' });
    //         }
            
    //         // Create a new comment
    //         const newChildComment = new Comment({
    //             comment_message,
    //             commenter: req.user_id,
    //             parentComment: parentCommentId, // Assign the parent comment ID to the new child comment
    //         });
            
    //         // Save the new child comment
    //         await newChildComment.save();
            
    //         // Update the parent comment's children array
    //         const parentComment = await Comment.findById(parentCommentId);
    //         if (!parentComment) {
    //             return res.status(404).json({ 
    //                 message: 'Parent comment not found',  
    //                 parentcommentId: parentCommentId,
    //                 comment_message: comment_message,
    //                 ChildCommentId: newChildComment._id
    //             });
    //         }
            
    //         // Add the new child comment's ID to the parent comment's children array
    //         parentComment.children.push(newChildComment._id);
    //         await parentComment.save();
            
    //         // Send response
    //         return res.status(201).json({ message: 'Child comment added successfully', newChildComment });
    //     } catch (error) {
    //         console.error('Error creating child comment:', error);
    //         return res.status(500).json({ message: 'Internal Server Error' });
    //     }
    // },

    DeleteComment: async (req, res) => {
        const { commentId } = req.params;    
        try {
            // Deleting the main comment
            await Comment.findByIdAndDelete(commentId);
            res.status(200).json({ message: 'Comment deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: `Failed to delete comment` });
        }
    },
    
 
};

module.exports = CommentsController;
