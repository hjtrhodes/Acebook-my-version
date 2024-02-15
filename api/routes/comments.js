const express = require("express");
const router = express.Router();

const CommentsController = require("../controllers/comments");

router.post('/:postId', CommentsController.CreateComment);
// router.post('/:id/children', CommentsController.CreateChildComment);
router.delete('/:commentId', CommentsController.DeleteComment);

module.exports = router;