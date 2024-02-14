const express = require("express");
const router = express.Router();

const CommentsController = require("../controllers/comments");

router.post('/:id', CommentsController.CreateComment);
router.post('/:id/children', CommentsController.CreateChildComment);
router.delete('/:commentId/:parentId', CommentsController.DeleteComment);

module.exports = router;