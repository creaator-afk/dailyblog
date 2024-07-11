const Router = require("express").Router();
const UserController = require("../controller/userController");
const BlogRoutes = require("./blogRoutes");
const ShareRoutes = require("./shareRoutes");

function verifyUserToken(req, res, next) {
	if (!req.userData.id) {
		res.status(401).send("UNAUTHORIZED");
		return;
	} else {
		next();
	}
}

Router.post("/signUp", UserController.createUser);
Router.post("/signIn", UserController.signIn);
// Router.get("/auth", UserController.checkToken);
Router.post("/profile", UserController.checkUserToken, UserController.createProfile);
Router.use("/blog", UserController.checkUserToken, verifyUserToken, BlogRoutes);
Router.use("/share", UserController.checkUserToken, verifyUserToken, ShareRoutes);

module.exports = Router;

