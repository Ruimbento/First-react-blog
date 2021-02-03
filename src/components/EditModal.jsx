import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { StateContext } from "../reducer";
import axios from "axios";

function EditModal() {
  const [state, dispatch] = React.useContext(StateContext);
  const [editedPostData, setEditedPostData] = React.useState({
    name: "",
    title: "",
    image: "",
    text: "",
  });

  React.useEffect(() => {
    if (state.showEditModal) {
      setEditedPostData({
        name: state.postForEditing.name,
        title: state.postForEditing.title,
        image: state.postForEditing.image,
        text: state.postForEditing.description,
      });
    }
  }, [state.showEditModal]);

  const handleEdit = (e) => {
    setEditedPostData({ ...editedPostData, [e.target.id]: e.target.value });
  };

  const handleSave = () => {
    axios
      .put(
        `https://5c3755177820ff0014d92711.mockapi.io/${state.postForEditing.type}s/${state.postForEditing.id}`,
        editedPostData
      )
      .then((answer) => {
        dispatch({
          type: `UPDATE_${state.postForEditing.type.toUpperCase()}`,
          payload: {
            posts: state.posts.map((post) => {
              if (post.id === state.postForEditing.id) {
                post.name = editedPostData.name;
                post.title = editedPostData.title;
                post.image = editedPostData.image;
                post.description = editedPostData.text;
              }

              return post;
            }),
          },
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleClose = () => {
    dispatch({
      type: "HIDE_EDIT_MODAL",
    });
  };

  return (
    <Modal show={state.showEditModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          Edit post: <b>{state.postForEditing.title}</b>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Автор</Form.Label>
            <Form.Control
              type="text"
              value={editedPostData.name}
              onChange={handleEdit}
            />
          </Form.Group>
          <Form.Group controlId="title">
            <Form.Label>Название</Form.Label>
            <Form.Control
              type="text"
              value={editedPostData.title}
              onChange={handleEdit}
            />
          </Form.Group>
          <Form.Group controlId="image">
            <Form.Label>Название</Form.Label>
            <Form.Control
              type="text"
              value={editedPostData.image}
              onChange={handleEdit}
            />
          </Form.Group>
          <Form.Group controlId="text">
            <Form.Label>Текст</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={editedPostData.text}
              onChange={handleEdit}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditModal;
