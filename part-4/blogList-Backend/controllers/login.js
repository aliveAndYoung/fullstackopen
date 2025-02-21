const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    const passwordValid = user
        ? await bcrypt.compare(password, user.passwordHash)
        : false;

    if (!passwordValid) {
        return res.status(401).json({ error: "invalid credentials" });
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET, {
        expiresIn: "1h",
    });

    res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
