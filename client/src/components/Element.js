import React from "react";

const Element = (props) => {
  //   console.log(props);
  const { element, deleteValue } = props.data;

  return (
    <div>
      <span>{element.element}</span>
      <span>
        <button
          onClick={() => {
            deleteValue(element._id);
          }}
        >
          Delete
        </button>
      </span>
      <span>
        <button>Edit</button>
      </span>
    </div>
  );
};

export default Element;
