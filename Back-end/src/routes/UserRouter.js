const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");

// token dang bi loi
const {
  authMiddleware,
  authUserMiddleware,
} = require("../middleware/authmiddleware");

router.post("/sign-up", UserController.createUser);
router.post("/sign-in", UserController.loginUser);
router.post("/logout", UserController.logoutUser);
router.put("/update-user/:id", UserController.updateUser);
router.delete("/delete-user/:id", authMiddleware, UserController.deleteUser);
router.get("/getALl", UserController.getAll);
router.get("/getUser/:id", authUserMiddleware, UserController.getAllUserbyId);
router.post("/refresh-token", UserController.refreshUserToken);

module.exports = router;
