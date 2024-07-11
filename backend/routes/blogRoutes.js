const Router = require("express").Router();
const BlogController = require("../controller/blogController");

Router.post("/", BlogController.createBlog);
Router.delete("/:id", BlogController.deleteBlog);
Router.get("/", BlogController.getAllBlog);
Router.get("/:id", BlogController.getBlogById);
Router.patch("/:id", BlogController.editBlog);

module.exports = Router;

