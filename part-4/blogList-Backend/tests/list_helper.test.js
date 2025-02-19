const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

// Sample data defined at top level
const sampleBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0,
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0,
    },
];

describe("Dummy test", () => {
    test("returns 1", () => {
        assert.strictEqual(listHelper.dummy([]), 1);
    });
});

describe("Total likes", () => {
    test("of empty list is 0", () => {
        assert.strictEqual(listHelper.totalLikes([]), 0);
    });

    test("of single blog equals its likes", () => {
        assert.strictEqual(listHelper.totalLikes([sampleBlogs[0]]), 7);
    });

    test("of multiple blogs is calculated correctly", () => {
        assert.strictEqual(listHelper.totalLikes(sampleBlogs), 24);
    });
});

describe("Favorite blog", () => {
    test("of empty list returns null", () => {
        assert.strictEqual(listHelper.favoriteBlog([]), null);
    });

    test("identifies blog with most likes", () => {
        assert.deepStrictEqual(
            listHelper.favoriteBlog(sampleBlogs),
            sampleBlogs[2]
        );
    });
});

describe("Most blogs", () => {
    test("of empty list returns null", () => {
        assert.strictEqual(listHelper.mostBlogs([]), null);
    });

    test("identifies author with most blogs", () => {
        assert.deepStrictEqual(listHelper.mostBlogs(sampleBlogs), {
            author: "Edsger W. Dijkstra",
            blogs: 2,
        });
    });
});

describe("Most likes", () => {
    test("of empty list returns null", () => {
        assert.strictEqual(listHelper.mostLikes([]), null);
    });

    test("identifies author with most total likes", () => {
        assert.deepStrictEqual(listHelper.mostLikes(sampleBlogs), {
            author: "Edsger W. Dijkstra",
            likes: 17, // 5 + 12 from sample blogs
        });
    });
});
