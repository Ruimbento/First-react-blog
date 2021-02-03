import React from "react";
import axios from "axios";
import faker from "faker";
import { Form, Button } from "react-bootstrap";
import { StateContext } from "../reducer";
import { generatePostText } from "../utils";

import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

function BlogPostPage(props) {
  const [state, dispatch] = React.useContext(StateContext);
  const [post, setPost] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [comments, setComments] = React.useState([]);
  const [commentAuthor, setCommentAuthor] = React.useState("");
  const [commentText, setCommentText] = React.useState("");

  // Использую split() + pop() из-за того, что нужен тип материала. Можно заменить props.match.params.id
  let urnArray = props.match.url.split("/");
  const postId = urnArray.pop();
  const type = urnArray.pop();

  React.useEffect(() => {
    let postData = state[type + "s"].filter((item) => {
      return item.id === postId;
    })[0];

    if (postData) {
      setPost(postData);
    } else {
      fetchPost();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.posts, state.articles]);

  React.useEffect(() => {
    let commentsData = state[type + "sComments"].filter((item) => {
      return item.postId === postId;
    });

    if (commentsData.length) {
      setComments(commentsData);
    } else {
      fetchPostComments();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.postsComments, state.articlesComments]);

  React.useEffect(() => {
    if (post.id && comments) {
      setIsLoading(false);
    }
  }, [post, comments]);

  const fetchPost = () => {
    axios
      .get(`https://5c3755177820ff0014d92711.mockapi.io/${type}s/${postId}`)
      .then(({ data }) => {
        data = generatePostText(data);
        data.type = type;

        if (type === "post") {
          data.image = "https://picsum.photos/400/300?" + data.id;
          data.imageBig = "https://picsum.photos/1200/600?" + data.id;
        } else {
          data.imageBig = data.image;
        }

        dispatch({
          type: `ADD_${type.toUpperCase()}`,
          payload: {
            post: data,
          },
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const fetchPostComments = () => {
    axios
      .get(
        `https://5c3755177820ff0014d92711.mockapi.io/${type}s/${postId}/comments`
      )
      .then(({ data }) => {
        let difference = data.filter(
          ({ id: dataId }) =>
            !comments.some(({ id: commentId }) => dataId === commentId)
        );

        difference.map((item) =>
          dispatch({
            type: `SAVE_${type.toUpperCase()}_COMMENT`,
            payload: {
              postComments: item,
            },
          })
        );
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const addComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `https://5c3755177820ff0014d92711.mockapi.io/${type}s/${postId}/comments`,
        {
          postId: postId,
          createdAt: new Date(),
          name: commentAuthor,
          text: commentText,
        }
      );
    } catch (e) {
      alert(e.message);
    }

    setCommentAuthor("");
    setCommentText("");

    fetchPostComments();
  };

  return (
    <div id="BlogPostPage">
      <header
        style={
          !isLoading
            ? {
                backgroundImage: `url(${post.imageBig})`,
              }
            : null
        }
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
