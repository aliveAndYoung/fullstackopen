const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
    res.json(courses);
});

const courses = [
    { id: 1, title: "JavaScript Basics", price: 29.99 },
    { id: 2, title: "Advanced Node.js", price: 49.99 },
    { id: 3, title: "React for Beginners", price: 39.99 },
    { id: 4, title: "Node.js for Professionals", price: 59.99 },
    { id: 5, title: "Mastering MongoDB", price: 49.99 },
    { id: 6, title: "Python for Beginners", price: 39.99 },
    { id: 7, title: "Django for Professionals", price: 59.99 },
    { id: 8, title: "Ruby on Rails Basics", price: 49.99 },
    { id: 9, title: "Java for Beginners", price: 39.99 },
    { id: 10, title: "C# for Professionals", price: 59.99 },
];

app.get("/api/courses/:courseId", (req, res) => {
    const courseId = parseInt(req.params.courseId);
    const course = courses.find((c) => c.id === courseId);
    if (course) {
        res.json(course);
    } else {
        res.status(404).send("Course not found");
    }
});

app.get("/home", (req, res) => {
    res.send("<h1>Home Page</h1>");
});


app.post("/api/courses", (req, res) => {
    const course = req.body;
    course.id = courses.length + 1;
    courses.push(course);
    res.json(course);
})


app.listen(3000, () => {
    console.log("Server running on port 3000");
});
