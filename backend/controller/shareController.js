const Repository = require("../lib/repository");
function ShareController() {}

ShareController.getBlogSharedByMe = async function (req, res) {
	try {
		const share = await Repository.getBlogSharedByMe(req.userData.id);
		res.status(200).send(share);
	} catch (error) {
		res.status(400).send(error.message);
	}
};

ShareController.editShareByMe = async function (req, res) {
	try {
		const share = await Repository.editShareByUserId(req.body);
		res.status(200).send(share);
	} catch (error) {
		res.status(400).send(error.message);
	}
};

ShareController.createShare = async function (req, res) {
	try {
		const newShare = await Repository.createShare(req.body, req.userData.id);
		res.status(201).send(newShare);
	} catch (error) {
		res.status(400).send(error.message);
	}
};

ShareController.getBlogSharedWithMe = async function (req, res) {
	try {
		const share = await Repository.getBlogShareWithMe(req.userData.id);
		res.status(200).send(share);
	} catch (error) {
		res.status(400).send(error.message);
	}
};

module.exports = ShareController;

