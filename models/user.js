const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email addresses are unique
    trim: true, // Remove leading and trailing whitespace
    lowercase: true, // Convert email to lowercase
    index: true, // Create an index for the email field
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    trim: true, // Remove leading and trailing whitespace
    unique : true
  },
  imageurl: {
    type: String,
    required: true,
    trim: true, // Remove leading and trailing whitespace
  },
});
// userSchema.plugin(autoIncrement, { field: "userid" });
// Create a model based on the schema and specify the collection name
const User = mongoose.model("User", userSchema, "users"); // Specify the collection name as 'users'

// Export the model
module.exports = User;
