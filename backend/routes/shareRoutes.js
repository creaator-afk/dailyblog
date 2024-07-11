const ShareController = require("../controller/shareController");

const Router = require("express").Router();
Router.post("/", ShareController.createShare);
Router.get('/shared', ShareController.getBlogSharedWithMe);
Router.get('/', ShareController.getBlogSharedByMe);
Router.patch('/:id', ShareController.editShareByMe);
// Router.delete('/:id', ShareController.deleteShare);

module.exports = Router;

