const express = require("express");
const router = express.Router();
const multer = require('multer'); 
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const UsersController = require("../controllers/users");

router.post("/", UsersController.Create);
router.get("/userProfile", UsersController.FindSingleUserById);
router.get("/:id", UsersController.IndexById);
router.get("/", UsersController.GetAllUsers);
router.put("/profileImage", upload.single('image'), UsersController.AddProfileImage);

module.exports = router;
