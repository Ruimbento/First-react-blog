import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { StateContext } from "../reducer";
import axios from "axios";
import { generatePostText } from "../utils";

function AddModal() {
  const [state, dispatch] = React.useContext(StateContext);
  const [newPostData, setNewPostData] = React.useState({
    name: "",
    title: "",
    image: "",
    text: "",
    createdAt: new Date(),
  });

  const handleEdit = (e) => {
    setNewPostData({ ...newPostData, [e.target.id]: e.target.value });
  };

  const handleClose = () => {
    dispatch({
      type: "HIDE_ADD_MODAL",
    });

    setNewPostData({
      name: "",
      title: "",
      image: "",
      text: "",
      createdAt: new Date(),
    });
  };

  const handleSave = () => {
    axios
      .post(
        `https://5c3755177820ff0014d92711.mockapi.io/${state.addPostType}s`,
        newPostData
      )
      .then(({ data }) => {
        data = generatePostText(data);
        data.type = state.addPostType;

        if (state.addPostType === "post") {
          data.image = "https://picsum.photos/400/300?" + data.id;
          data.imageBig = "https://picsum.photos/1200/600?" + data.id;
        } else {
          data.imageBig = data.image;
        }

        dispatch({
          type: `ADD_${state.addPostType.toUpperCase()}`,
          payload: {
            post: data,
          },
        });

        handleClose();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <Modal show={state.showAddModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add {state.addPostType}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Автор</Form.Label>
            <Form.Control
              type="text"
              value={newPostData.name}
              onChange={handleEdit}
            />
          </Form.Group>
          <Form.Group controlId="title">
            <Form.Label>Название</Form.Label>
            <Form.Control
              type="text"
              value={newPostData.title}
              onChange={handleEdit}
            />
          </Form.Group>
          <Form.Group controlId="image">
            <Form.Label>Ссылка на изображение</Form.Label>
            <Form.Control
              type="text"
              value={newPostData.image}
              onChange={handleEdit}
            />
          </Form.Group>
          <Form.Group controlId="text">
            <Form.Label>Описание</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={newPostData.text}
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

export default AddModal;
