const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

usersRouter.post("/", async (req, res) => {
    const { username, name, password } = req.body;

    if (!password || password.length < 3) {
        return res.status(400).json({
            error: "Password must be at least 3 characters",
        });
    }

    if (!username || username.length < 3) {
        return res.status(400).json({
            error: "Username must be at least 3 characters",
        });
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
        return res.status(400).json({
            error: "username must be unique",
        });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        username,
        name,
        passwordHash,
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
});

usersRouter.get("/", async (req, res) => {
    const users = await User.find({}).populate("blogs");
    res.json(users);
});

// usersRouter.delete("/:id", async (req, res) => {
//     const user = await User.findById(req.params.id);
//     if (user) {
//         await User.findByIdAndRemove(req.params.id);
//         res.status(204).end();
//     } else {
//         res.status(404).end();
//     }
// });

module.exports = usersRouter;
