const express = require("express");
const router = express.Router();
const multer = require('multer'); 
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const PostsController = require("../controllers/posts");

router.post("/", upload.single('image'), PostsController.CreatePostandAddImage);
router.get("/", PostsController.getAllPosts);
router.post("/", PostsController.CreatePostandAddImage);
router.get("/user", PostsController.IndexLoggedInUser);
router.get("/user/:authorId", PostsController.getAllPostsByAuthorId);
router.put("/:id/likes", PostsController.AddOrRemoveUserIDFromPostLikesArray);
router.get("/:postId/:userId/likes", PostsController.GetLikes);
router.delete('/:postId', PostsController.DeletePost);


module.exports = router; 