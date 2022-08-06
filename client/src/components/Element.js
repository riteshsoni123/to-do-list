import React from "react";

const Element = (props) => {
  //   console.log(props);
  const { element, deleteValue, updateModal, id } = props.data;

  return (
    <div>
      <span>{element.element}</span>
      <span>
        <button
          onClick={() => {
            id.current = element._id;
            deleteValue();
          }}
        >
          Delete
        </button>
      </span>
      <span>
        <button
          onClick={() => {
            id.current = element._id;
            updateModal();
          }}
        >
          Edit
        </button>
      </span>
    </div>
  );
};

export default Element;
