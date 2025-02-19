const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const helper = require("./test_helper");
const Blog = require("../models/blog");

describe("when there is initially some blogs saved", () => {
    beforeEach(async () => {
        await Blog.deleteMany({});
        await Blog.insertMany(helper.initialBlogs);
    });

    describe("GET /api/blogs", () => {
        test("returns blogs as json", async () => {
            await api
                .get("/api/blogs")
                .expect(200)
                .expect("Content-Type", /application\/json/);
        });

        test("returns all blogs", async () => {
            const response = await api.get("/api/blogs");
            assert.strictEqual(
                response.body.length,
                helper.initialBlogs.length
            );
        });

        test("blog posts have id property", async () => {
            const response = await api.get("/api/blogs");
            const blog = response.body[0];
            assert.ok(blog.id);
            assert.strictEqual(blog._id, undefined);
        });
    });

    describe("POST /api/blogs", () => {
        test("creates a new blog post", async () => {
            const newBlog = {
                title: "TypeScript Guide",
                author: "Jane Doe",
                url: "https://typescriptguide.com",
                likes: 12,
            };

            await api
                .post("/api/blogs")
                .send(newBlog)
                .expect(201)
                .expect("Content-Type", /application\/json/);

            const blogsAtEnd = await helper.blogsInDb();
            assert.strictEqual(
                blogsAtEnd.length,
                helper.initialBlogs.length + 1
            );
        });

        test("defaults likes to 0 if missing", async () => {
            const newBlog = {
                title: "No Likes Blog",
                author: "John Doe",
                url: "https://nolikes.com",
            };

            const response = await api
                .post("/api/blogs")
                .send(newBlog)
                .expect(201);

            assert.strictEqual(response.body.likes, 0);
        });

        test("returns 400 if title is missing", async () => {
            const invalidBlog = {
                author: "Anonymous",
                url: "https://missingtitle.com",
                likes: 5,
            };

            await api.post("/api/blogs").send(invalidBlog).expect(400);
        });

        test("returns 400 if url is missing", async () => {
            const invalidBlog = {
                title: "Missing URL Blog",
                author: "Anonymous",
                likes: 3,
            };

            await api.post("/api/blogs").send(invalidBlog).expect(400);
        });
    });

    describe('DELETE /api/blogs/:id', () => {
        test('succeeds with status 204 for valid ID', async () => {
          const blogsAtStart = await helper.blogsInDb()
          const blogToDelete = blogsAtStart[0]
      
          await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
      
          const blogsAtEnd = await helper.blogsInDb()
          assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
        })
      
        test('fails with 400 for invalid ID', async () => {
          const invalidId = 'invalid-id-123'
          await api
            .delete(`/api/blogs/${invalidId}`)
            .expect(400)
        })
      
        test('fails with 404 for non-existent ID', async () => {
          const validNonexistingId = await helper.nonExistingId()
          await api
            .delete(`/api/blogs/${validNonexistingId}`)
            .expect(404)
        })
      })
      
      describe('PUT /api/blogs/:id', () => {
        test('succeeds with valid data (likes)', async () => {
          const blogsAtStart = await helper.blogsInDb()
          const blogToUpdate = blogsAtStart[0]
          const newLikes = blogToUpdate.likes + 100
      
          const response = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send({ likes: newLikes })
            .expect(200)
      
          assert.strictEqual(response.body.likes, newLikes)
        })
      
        test('fails with 400 for invalid ID', async () => {
          const invalidId = 'invalid-id-123'
          await api
            .put(`/api/blogs/${invalidId}`)
            .send({ likes: 50 })
            .expect(400)
        })
      
        test('fails with 404 for non-existent ID', async () => {
          const validNonexistingId = await helper.nonExistingId()
          await api
            .put(`/api/blogs/${validNonexistingId}`)
            .send({ likes: 100 })
            .expect(404)
        })
      })

    describe("PUT /api/blogs/:id", () => {
        test("updates blog likes", async () => {
            const blogsAtStart = await helper.blogsInDb();
            const blogToUpdate = blogsAtStart[0];
            const updatedLikes = blogToUpdate.likes + 10;

            const response = await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .send({ likes: updatedLikes })
                .expect(200);

            assert.strictEqual(response.body.likes, updatedLikes);
        });

        test("returns 400 with invalid id", async () => {
            const invalidId = "invalid456";
            await api
                .put(`/api/blogs/${invalidId}`)
                .send({ likes: 50 })
                .expect(400);
        });

        test("returns 404 with non-existent id", async () => {
            const validNonexistingId = await helper.nonExistingId();
            await api
                .put(`/api/blogs/${validNonexistingId}`)
                .send({ likes: 100 })
                .expect(404);
        });
    });
});

after(async () => {
    await mongoose.connection.close();
});
