import React from "react";

function BlogPostCard({ post }) {
  const parseDate = function (dateString) {
    let date = new Date(dateString);
    return date.toLocaleString("default", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div key={post.id} className="blog-post post">
      <div
        className="post-container"
        onClick={() => {
          window.location.pathname = `/${post.type}/${post.id}`;
        }}
      >
        <div className="post-image">
          <img src={post.image} alt={post.title} />
        </div>
        <div className="post-text">
          <h4 className="post-title">{post.title}</h4>
          <p className="post-description">{post.text}</p>
          <p className="post-date">{parseDate(post.createdAt)}</p>
          <div className="admin-buttons">
            <p className="admin-buttons-edit">Edit</p>
            <p className="admin-buttons-delete">Delete</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPostCard;
