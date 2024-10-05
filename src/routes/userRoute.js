const express = require("express");
const { createUser, getUsers, findUser, loginUser, editUser, deleteUser } = require("../controllers/userController");
const router = express.Router();

router.post("/create", createUser);
router.get("/users", getUsers);
router.get("/:id", findUser);
router.put("/:id/edit", editUser);
router.delete("/:id/delete", deleteUser);
router.post("/login", loginUser);

router.use("/", (req, res) => {
  res.json({ message: "User API" });
});

module.exports = router;