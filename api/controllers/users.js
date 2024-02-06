const User = require("../models/user");
const TokenGenerator = require("../lib/token_generator");
const Post = require("../models/post");

const UsersController = {
  
  GetAllUsers: async (req, res) => {
    try {
      const users = await User.find({});
      if (!users) {
        return res.status(404).json({ message: 'No users found' });
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      return res.status(200).json({ message: 'OK', users: users, token: token });
    } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  
  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        res.status(400).json({message: 'Bad request'});
      } else {
        res.status(201).json({ message: 'OK' });
      }
    });
  },
        
        FindSingleUserById: (req, res) => {
          const userId = req.user_id; 
          User.findById(userId).select('firstName').exec((err, user) => {
            if (err) {
              // Handle error
              res.status(500).json({ error: 'Internal Server Error' });
            } else if (!user) {
              // Handle case where user is not found
              res.status(404).json({ error: 'User not found' });
            } else {
              // User found, send back the firstName and lastName
              const token = TokenGenerator.jsonwebtoken(req.user_id)
              res.status(200).json({ token: token, firstName: user.firstName , lastName: user.lastName});
            }
          });
        },
        
        // This function returns a *firstName and lastName*, not a user object,
        // so I've renamed it
        // - Perran
        FindSingleDisplayNameById: (req, res) => {
          const userId = req.user_id; 
          User.findById(userId).select('firstName').exec((err, user) => {
            if (err) {
              // Handle error
              res.status(500).json({ error: 'Internal Server Error' });
            } else if (!user) {
              // Handle case where user is not found
              res.status(404).json({ error: 'User not found' });
            } else {
              // User found, send back the firstName and lastName
              const token = TokenGenerator.jsonwebtoken(req.user_id)
              res.status(200).json({ token: token, firstName: user.firstName , lastName: user.lastName });
            }
          });
        },
        
        IndexById: (req, res) => {
          const userId = req.params.id;
          User.findById(userId).exec((err, user) => {
            //res.status(500).json({ message: `Searching for user with id ${userId}`});
            if (err) {
              res.status(500).json({ error: "Internal Server Error" });
            } else if (!user) {
              res.status(404).json({ error: "User not found" });
            } else {
              const token = TokenGenerator.jsonwebtoken(req.user_id)
              res.status(200).json({ message: "OK", user: user, token: token })
            }
          });
        }
      };

module.exports = UsersController;
