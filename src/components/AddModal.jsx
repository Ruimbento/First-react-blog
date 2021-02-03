import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { StateContext } from "../reducer";

function AddModal() {
  const [state, dispatch] = React.useContext(StateContext);
  const [newPostData, setNewPostData] = React.useState({
    name: "",
    title: "",
    image: "",
    description: "",
  });

  const handleEdit = (e) => {
    setNewPostData({ ...newPostData, [e.target.id]: e.target.value });
  };

  const handleClose = () => {
    dispatch({
      type: "HIDE_ADD_MODAL",
    });
  };

  const handleSave = () => {};

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
          <Form.Group controlId="description">
            <Form.Label>Описание</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={newPostData.description}
              onChange={handleEdit}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddModal;
