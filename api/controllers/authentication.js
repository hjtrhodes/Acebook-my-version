const User = require("../models/user");
const TokenGenerator = require("../lib/token_generator");

const AuthenticationController = {
  Authenticate: (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }).then((user) => {
      if (!user) {
        console.log("auth error: user not found");
        return res.status(401).json({ error: "User not found" });
      } else if (user.password !== password) {
        console.log("auth error: passwords do not match");
        return res.status(401).json({ error: "Passwords do not match" });
      } else {
        const token = TokenGenerator.jsonwebtoken(user.id);
        console.log("token");
        console.log(token);

        return res.status(201).json({
          token: token,
          userId: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          message: "OK",
        });
      }
    }).catch(err => {
      console.error("Authentication error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    });
  }
};

module.exports = AuthenticationController;

