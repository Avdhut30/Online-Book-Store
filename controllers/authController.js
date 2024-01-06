const User = require("../models/auth");

const UserController = {
  register: async (req, res) => {
    try {
      const { username, password, email } = req.body;

      // Validate input
      if (!username || !password || !email) {
        return res
          .status(400)
          .json({ message: "Please provide all required fields" });
      }

      // Check if the user already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "Username already taken" });
      }

      // Create a new user
      const newUser = await User.create({ username, password, email });
      return res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Validate input
      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Please provide username and password" });
      }

      // Check if the user exists
      const user = await User.findOne({ username });
      if (!user || user.password !== password) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      // You may implement JWT token generation here for authentication
      // For simplicity, we'll just return a success message
      return res.status(200).json({ message: "Login successful" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = UserController;
