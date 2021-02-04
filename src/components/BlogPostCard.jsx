import React from "react";
import { Link } from "react-router-dom";
import { StateContext } from "../reducer";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

function BlogPostCard({ post }) {
  const [state, dispatch] = React.useContext(StateContext);
  const [showConfirmationModal, setShowConfirmationModal] = React.useState(
    false
  );

  const parseDate = function (dateString) {
    let date = new Date(dateString);
    return date.toLocaleString("default", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleShow = () => {
    dispatch({
      type: "SHOW_EDIT_MODAL",
      payload: {
        postForEditing: post,
      },
    });
  };

  const handleDelete = () => {
    axios
      .delete(
        `https://5c3755177820ff0014d92711.mockapi.io/${post.type}s/${post.id}`
      )
      .then((answer) => {
        dispatch({
          type: `DELETE_${post.type.toUpperCase()}`,
          payload: {
            posts: state[post.type + "s"].filter((statePost) => {
              return statePost.id !== post.id;
            }),
          },
        });

        handleClose();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleClose = () => setShowConfirmationModal(false);
  const handleConfirmation = () => setShowConfirmationModal(true);

  return (
    <div className="blog-post post">
      <div className="post-container">
        <div className="post-image">
          <img src={post.image} alt={post.title} />
        </div>
        <div className="post-text">
          <Link className="post-link" to={`/${post.type}/${post.id}`}>
            <h4 className="post-title">{post.title}</h4>
          </Link>
          <p className="post-description">{post.description}</p>
          <p className="post-date">{parseDate(post.createdAt)}</p>
          {state.user.isLogin ? (
            <div className="adminSettings">
              <p className="editPost" onClick={handleShow}>
                Edit
              </p>
              <p className="deletePost" onClick={handleConfirmation}>
                Delete
              </p>
            </div>
          ) : null}
        </div>
      </div>

      <Modal
        show={showConfirmationModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Вы уверены, что хотите удалить?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Вы уверены, что хотите удалить статью: <b>{post.title}</b> ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Нет
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Да
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BlogPostCard;
