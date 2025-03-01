import { useState } from "react";

const Blog = ({ blog, handelLikes, handelBlogDeletion }) => {
    const [showDetails, setShowDetails] = useState(false);
    const styles = {
        border: "solid",
        borderWidth: 1,
        marginBottom: 5,
        padding: 3,
        color: "blue",
    };
    const Details = () => {
        return (
            <div>
                <p> URL : {blog.url} </p>
                <p>
                    Likes : {blog.likes}{" "}
                    <button
                        onClick={() => {
                            handelLikes(blog.id);
                        }}
                    >
                        Like
                    </button>{" "}
                </p>
                <p> User : {blog.user.name}</p>
            </div>
        );
    };

    return (
        <div style={styles}>
            {blog.title}{" "}
            <button
                onClick={() => {
                    setShowDetails(!showDetails);
                }}
            >
                Show Details
            </button>
            {showDetails && <Details />}
            <button
                onClick={() => {
                    handelBlogDeletion(blog.id);
                }}
            >
                Remove
            </button>
        </div>
    );
};

export default Blog;
