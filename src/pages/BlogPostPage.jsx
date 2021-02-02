import React from "react";
import axios from "axios";
import faker from "faker";
import { Form, Button } from "react-bootstrap";

import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

function BlogPostPage({ postId, type }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [post, setPost] = React.useState([]);
  const [comments, setComments] = React.useState([]);
  const [commentAuthor, setCommentAuthor] = React.useState("");
  const [commentText, setCommentText] = React.useState("");

  React.useEffect(() => {
    getPostData();
    getPostComments();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (post.id && comments) {
      setIsLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  const getPostData = () => {
    axios
      .get(`https://5c3755177820ff0014d92711.mockapi.io/${type}/${postId}`)
      .then(({ data }) => {
        type === "posts"
          ? (data.imageBig = `https://picsum.photos/1200/600?${postId}`)
          : (data.imageBig = data.image);

        data.description = data.text;

        let text = new Array(faker.random.number({ min: 3, max: 8 })).fill(
          faker.lorem.sentences(20)
        );

        const images = new Array(faker.random.number({ min: 2, max: 3 })).fill(
          faker.image.unsplash.imageUrl(600, 400)
        );

        // Рандомная сортировка массива с текстом и картинкой, для иммитации написаного поста.
        data.text = text.concat(images).sort((a, b) => {
          return 0.5 - Math.random();
        });

        setPost(data);
      });
  };

  const getPostComments = () => {
    axios
      .get(
        `https://5c3755177820ff0014d92711.mockapi.io/${type}/${postId}/comments`
      )
      .then(({ data }) => setComments(data));
  };

  const addComment = async (e) => {
    e.preventDefault();
    await axios.post(
      `https://5c3755177820ff0014d92711.mockapi.io/${type}/${postId}/comments`,
      {
        postId: postId,
        createdAt: new Date(),
        name: commentAuthor,
        text: commentText,
      }
    );

    setCommentAuthor("");
    setCommentText("");

    getPostComments();
  };

  return (
    <div id="BlogPostPage">
      <header
        style={{
          backgroundImage: `url(${post.imageBig})`,
        }}
      >
        <Navigation />
        <div className="container title-container">
          <h2>{isLoading ? "Loading" : post.title}</h2>
        </div>
      </header>

      {!isLoading ? (
        <div className="blog-post post" data-id={postId}>
          <div className="container post-data">
            <div className="post-text-container col-6 offset-2">
              <p>{post.description}</p>
              {post.text.map((item, index) =>
                item.includes("https://") ? (
                  <img src={item} key={index} alt="" />
                ) : (
                  <p key={index}>{item}</p>
                )
              )}
            </div>
            <div className="post-author col-2">
              <div className="post-author-container">
                <img
                  src={faker.image.unsplash.imageUrl(400, 400)}
                  alt=""
                  className="avatar"
                />
                <h5 className="post-author-name">{post.name}</h5>
                <p className="post-author-jobType">{faker.name.jobTitle()}</p>
                <p className="post-author-postsCount">
                  Posts: <b>{faker.random.number(100)}</b>
                </p>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="comments col-8 offset-2">
              <div className="comments-header">
                <h4>Комментарии({comments.length})</h4>
              </div>

              {comments.map((comment) => (
                <div key={comment.id} className="comment-block">
                  <div className="comment">
                    <div className="comment-text">
                      <h5>{comment.name}</h5>
                      <p>{comment.text}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="add-comment">
                <h4>Добавить свой комментарий:</h4>
                <div className="comment-input">
                  <Form onSubmit={addComment}>
                    <Form.Group controlId="commentAuthor">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="name"
                        placeholder="Enter your name"
                        value={commentAuthor}
                        onChange={(event) =>
                          setCommentAuthor(event.target.value)
                        }
                      />
                    </Form.Group>
                    <Form.Group controlId="commentText">
                      <Form.Label>Your comment</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={commentText}
                        onChange={(event) => setCommentText(event.target.value)}
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <Footer />
    </div>
  );
}

export default BlogPostPage;
