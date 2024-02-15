const User = require("../models/user");
const TokenGenerator = require("../lib/token_generator");
const bcrypt = require('bcrypt');

const AuthenticationController = {
  Authenticate: async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password; // Do not hash the password here for authentication
  
      const user = await User.findOne({ email: email });
  
      if (!user) {
        console.log("auth error: user not found");
        return res.status(401).json({ emailerror: "User not found, please enter correct email" });
      }
  
      // Compare the provided password with the hashed password stored in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        console.log("auth error: passwords do not match");
        return res.status(401).json({ passworderror: "Incorrect Password, please try again" });
      }
  
      // If the password matches, generate and send the token
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
    } catch (err) {
      console.error("Authentication error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  
};

module.exports = AuthenticationController;

