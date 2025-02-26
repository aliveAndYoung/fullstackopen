const User = require("../models/user");
const jwt = require("jsonwebtoken");
const logger = require("./logger");

const tokenExtractor = (req, res, next) => {
    const auth = req.get("Authorization");
    const token = auth?.startsWith("Bearer ")
        ? auth.replace("Bearer ", "")
        : null;
    req.token = token;
    next();
};

const userExtractor = async (req, res, next) => {
    if (req.token) {
        try {
            const decodedToken = jwt.verify(req.token, process.env.SECRET);
            console.log(decodedToken, "decodedToken");
            req.user = await User.findById(decodedToken.id);
            next();
        } catch (error) {
            return res.status(401).json({ error: "token invalid" });
        }
    } else {
        return res.status(401).json({ error: "token missing" });
    }
};

const requestLogger = (request, response, next) => {
    logger.info("Method:", request.method);
    logger.info("Path:  ", request.path);
    logger.info("Body:  ", request.body);
    logger.info("---");
    next();
};

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
    logger.error(error.message);

    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" });
    } else if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message });
    }

    next(error);
};

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor,
};
