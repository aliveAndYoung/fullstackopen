const mongoose = require("mongoose");
require("dotenv").config();
const password = process.argv[2] || undefined;
const personName = process.argv[3] || undefined;
const phoneNumber = process.argv[4] || undefined;

if (!password) {
    console.log("give password as argument");
    process.exit(1);
}
const url = process.env.MONGODB_URI;
mongoose.set("strictQuery", false);
mongoose.connect(url);
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});
const Person = mongoose.model("Person", personSchema);

if (!personName && !phoneNumber) {
    Person.find({}).then((result) => {
        result.forEach((person) => {
            console.log(person);
        });
        mongoose.connection.close();
    });
} else {
    const person = new Person({
        name: personName,
        number: phoneNumber,
    });

    person.save().then((result) => {
        console.log("perosn saved!");
        console.log(result);
        mongoose.connection.close();
    });
}
