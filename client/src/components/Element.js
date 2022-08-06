import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Element = (props) => {
  const { element, deleteValue, updateModal, id } = props.data;

  return (
    <Card className="col-md-3 mx-3 my-3">
      <Card.Body>
        <Card.Text>{element.element}</Card.Text>
        <Button
          variant="success"
          onClick={() => {
            id.current = element._id;
            updateModal();
          }}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            id.current = element._id;
            deleteValue();
          }}
        >
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Element;
