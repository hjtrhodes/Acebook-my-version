const User = require("../models/user");
const TokenGenerator = require("../lib/token_generator");
const bcrypt = require('bcrypt');

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
  
  Create: async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;

      // Check if the email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      // Password validation
      if (password.length < 8 || !/\d/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return res.status(400).json({ message: 'Password must contain at least 8 characters, one number, and one special character' });
      }

      // Check if all fields are completed
      if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: 'All fields must be completed to allow signup' });
      }

      // Email validation
      if (!email.includes('@')) {
        return res.status(400).json({ message: 'Email must contain the @ symbol' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword
      });

      await newUser.save();
      res.status(201).json({ message: 'OK' });
    } catch (err) {
      console.error('Error creating user:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
        
  FindSingleUserById: (req, res) => {
    const userId = req.user_id; 
    User.findById(userId).exec((err, user) => {
      if (err) {
        // Handle error
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (!user) {
        // Handle case where user is not found
        res.status(404).json({ error: 'User not found' });
      } else {
        // User found, send back the firstName and lastName
        const token = TokenGenerator.jsonwebtoken(req.user_id)
        res.status(200).json({ message: "OK", token: token, user: user });
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
  },

AddProfileImage: async (req, res) => {
  try {
    // Retrieve user ID from the request
    const userId = req.user_id;

    // Retrieve image buffer from the request file
    const imageBuffer = req.file ? req.file.buffer : null;

    // Convert image buffer to base64-encoded string
    let imageUrl = null;
    if (imageBuffer) {
      const base64Image = imageBuffer.toString('base64');
      imageUrl = base64Image;
    }

    // Find the user by ID
    let user = await User.findById(userId);

    // Update the profileImage property based on whether it already exists or not
    if (user.profileImage) {
      // If profile image exists, update it
      user = await User.findByIdAndUpdate(userId, { profileImage: imageUrl }, { new: true });
    } else {
      // If profile image doesn't exist, add it
      user = await User.findByIdAndUpdate(userId, { $set: { profileImage: imageUrl } }, { new: true });
    }

    // Generate a new JWT token for the user
    const token = TokenGenerator.jsonwebtoken(userId);

    // Respond with success message and token
    res.status(200).json({ message: 'Profile image added successfully', token });
  } catch (error) {
    console.error('Error adding profile image:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
},

  
};

module.exports = UsersController;
