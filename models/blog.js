const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  imageurl: {
    type: String,
  },
  userid: {
    type: String,
  },
  authorimageurl: {
    type: String,
  },
  authorname: {
    type: String,
  },
  createdtime : {
    type : String
  }
});

const Blog = mongoose.model("Blog", blogSchema, "blogs")
module.exports = Blog