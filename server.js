const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/userAuthRoute.js");
const blogRoutes = require("./routes/userBlogRoute.js")
// Connect to MongoDB with options
mongoose
  .connect("mongodb+srv://tiwariravikant2001:6S8fFWeaVGb1GzQf@cluster0.v4rea.mongodb.net/blog")
  .then(() => console.log("Connection made successfully"))
  .catch((err) => console.log("Could not connect to MongoDB:", err));

const app = express();

// Middleware to parse JSON
app.use(express.json());

// closure to 

// Routing to appropriate routes
app.use("/user", userRoute)
app.use("/blog", blogRoutes);

// Start the server
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
