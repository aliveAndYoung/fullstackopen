const  mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: { type: Number, default: 0 }, // Add default here
});

// Transform MongoDB's `_id` to `id` in responses
blogSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

module.exports = mongoose.model("Blog", blogSchema);
