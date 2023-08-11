const Router = require("express");
const userController = require("../controller/user-controller");
const router = new Router();

router.get("/users", userController.getUsers);
router.post("/user", userController.signUp);
router.post("/sign-in", userController.signIn);
router.put("/sign-in", userController.updateLastLogDate);
router.put("/user", userController.updateStatus);
router.get("/user/:email", userController.checkStatus);
router.delete("/delete-user/:email", userController.deleteUser);

module.exports = router;
