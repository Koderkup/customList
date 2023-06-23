const Router = require("express");
const router = new Router();
const userController = require("../controller/userCtrl");

router.post("/registration", userController.registration);
router.post("/login", userController.login);


module.exports = router;
