const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.post("/", UsersController.Create);
router.get("/user", UsersController.FindSingleUserById);
router.get("/display-name", UsersController.FindSingleDisplayNameById);
router.get("/:id", UsersController.IndexById);
router.get("/", UsersController.GetAllUsers);

  // NEED TO RETURN TO THIS (TODO)
  // router.get("/users", UsersController.FindAll);

module.exports = router;
