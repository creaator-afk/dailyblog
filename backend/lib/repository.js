const bcrypt = require("bcrypt");
const zod = require("zod");
const User = require("../models/UserModel");
const Profile = require("../models/ProfileModel");
const jwt = require("jsonwebtoken");
const Blog = require("../models/BlogModel");
const Share = require("../models/ShareModel");

function Repository() {}

Repository.getBlogShareWithMe = async (userRefId) => {
	const share = await Share.find({ shareWith: userRefId }, { __v: 0, shareWith: 0 }).populate(
		"blog"
	);
	if (!share) {
		throw new Error("SHARE_NOT_FOUND");
	}
	return share;
};

Repository.getBlogSharedByMe = async (userRefId) => {
	const share = await Share.find({ owner: userRefId }, { __v: 0, owner: 0 }).populate("blog");
	if (!share) {
		throw new Error("SHARE_NOT_FOUND");
	}
	return share;
};

Repository.createShare = async (data, ownerRef) => {
	const schema = zod.object({
		blog: zod.string().min(24).max(24),
		accessPermission: zod.enum(["view", "edit"]),
		shareWith: zod.array(zod.string().min(24).max(24)),
	});
	const validation = schema.safeParse(data);
	if (!validation.success) {
		throw new Error(validation.error);
	}
	const shareAlreadyExist = await Share.findOne({
		blog: data.blog,
		owner: ownerRef,
	}, {__v: 0, owner: 0});

	if (shareAlreadyExist) {
		return shareAlreadyExist;
	}

	const newShare = await Share.create({ ...data, owner: ownerRef });
	return {
		id: newShare._id,
		owner: newShare.owner,
		blog: newShare.blog,
		accessPermission: newShare.accessPermission,
		shareWith: newShare.shareWith,
	};
};

Repository.editShareByUserId = async (data) => {
	const schema = zod.object({
		blog: zod.string().min(24).max(24),
		userRef: zod.string().min(24).max(24).optional(),
	});
	const validation = schema.safeParse(data);
	if (!validation.success) {
		throw new Error(validation.error);
	}
	const share = await Share.findOneAndUpdate(
		{ blog: data.blog, accessPermission: "edit" },
		data,
		{ new: true }
	);
	if (share === null) {
		throw new Error("BLOG_NOT_SHARED");
	}
	return share;
};

Repository.editBlog = async (data, id) => {
	const schema = zod.object({
		title: zod.string().min(3).max(50).optional(),
		description: zod.string().min(3).max(10000).optional(),
		image: zod.string().min(3).optional(),
	});
	const validation = schema.safeParse(data);
	if (!validation.success) {
		throw new Error(validation.error);
	}
	const post = await Blog.findByIdAndUpdate(id, data, { new: true });
	return post;
};

Repository.createBlog = async (data, userRef) => {
	const schema = zod.object({
		title: zod.string().min(3).max(50),
		description: zod.string().min(3).max(10000),
		image: zod.string().min(3),
	});
	const validation = schema.safeParse(data);
	if (!validation.success) {
		throw new Error(validation.error);
	}
	const newPost = await Blog.create({ ...data, createdBy: userRef });
	return newPost;
};

Repository.getBlogById = async (id) => {
	return await Blog.findById(id, { __v: 0, createdBy: 0 });
};

Repository.getAllBlog = async (userRef) => {
	// TODO: paginate this
	const posts = await Blog.find({ createdBy: userRef }, { __v: 0, createdBy: 0 });
	return posts;
};

Repository.deleteBlog = async (blogId) => {
	const blog = await Blog.findById(blogId, { _id: 1 });
	if (!blog) {
		throw new Error("BLOG_NOT_FOUND");
	}
	await blog.deleteOne();
	return blog;
};

Repository.createProfile = async (data, userRef) => {
	const schema = zod.object({
		firstName: zod.string().min(3).max(50),
		lastName: zod.string().min(3).max(50),
	});
	const validation = schema.safeParse(data);
	if (!validation.success) {
		throw new Error(validation.error);
	}
	const newProfile = await Profile.create({ ...data, createdBy: userRef });
	return newProfile;
};

Repository.checkUser = async (data) => {
	return await User.findOne({ username: data.username });
};

Repository.createUser = async function (user) {
	const schema = zod.object({
		username: zod.string().min(3).max(50),
		password: zod.string().min(8).max(20),
	});
	const validation = schema.safeParse(user);
	if (!validation.success) {
		throw new Error(validation.error);
	}
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);
	user.salt = salt;
	const newUser = await User.create(user);
	return newUser;
};

Repository.getTokens = function (user) {
	const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "1d",
	});
	const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: "10d",
	});
	return { accessToken, refreshToken };
};

Repository.verifyToken = function (token) {
	const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
	return decoded;
};

module.exports = Repository;

