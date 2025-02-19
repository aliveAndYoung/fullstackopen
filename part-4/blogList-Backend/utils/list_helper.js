const _ = require("lodash");

// 4.3: Dummy function
const dummy = (blogs) => 1;

// 4.4: Total likes
const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);

// 4.5*: Favorite blog
const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null;
    const maxLikes = Math.max(...blogs.map((blog) => blog.likes));
    return blogs.find((blog) => blog.likes === maxLikes);
};

// 4.6*: Most blogs (fixed empty array handling)
const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null;
    const authorCounts = _.countBy(blogs, "author");
    const entries = Object.entries(authorCounts);
    if (entries.length === 0) return null;
    const topAuthor = _.maxBy(entries, ([, count]) => count);
    return { author: topAuthor[0], blogs: topAuthor[1] };
};

// 4.7*: Most likes (fixed empty array handling)
const mostLikes = (blogs) => {
    if (blogs.length === 0) return null;
    const likesByAuthor = _.reduce(
        blogs,
        (result, blog) => {
            result[blog.author] = (result[blog.author] || 0) + blog.likes;
            return result;
        },
        {}
    );
    const entries = Object.entries(likesByAuthor);
    if (entries.length === 0) return null;
    const topAuthor = _.maxBy(entries, ([, likes]) => likes);
    return { author: topAuthor[0], likes: topAuthor[1] };
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
};
