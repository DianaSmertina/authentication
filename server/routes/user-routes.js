const Router = require("express");
const userController = require("../controller/user-controller");
const router = new Router();

router.get("/user", userController.getUsers);
router.post("/user", userController.signUp);
router.post("/sign-in", userController.signIn);
router.put("/sign-in", userController.updateLastLogDate);

module.exports = router;
