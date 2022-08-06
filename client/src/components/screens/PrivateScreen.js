import { React, useState, useEffect, useRef } from "react";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import Element from "../Element";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const PrivateScreen = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const [value, setValue] = useState("");
  const [newValue, setNewValue] = useState("");
  const [modal, setModal] = useState(false);
  const [list, setList] = useState([]);
  const id = useRef("");

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login");
    }

    const fetchPrivateData = async () => {
      const config = {
        headers: {
          contentType: "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/personal/private", config);
        setPrivateData(data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
      try {
        const { data } = await axios.get("/api/personal/getlist", config);
        setList(data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };
    fetchPrivateData();
  }, [navigate]);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const saveValue = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        contentType: "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    try {
      const { data } = await axios.post(
        "/api/personal/addelement",
        { element: value },
        config
      );
      setList(list.concat(data));
      setValue("");
    } catch (error) {
      localStorage.removeItem("authToken");
      setError("You are not authorized please login");
    }
  };

  const deleteValue = async () => {
    const config = {
      headers: {
        contentType: "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    try {
      await axios.post(`/api/personal/deleteelement/${id.current}`, {}, config);

      const newList = list.filter((element) => {
        return element._id !== id.current;
      });

      setList(newList);
    } catch (error) {
      localStorage.removeItem("authToken");
      setError("You are not authorized please login");
    }
  };

  const editValue = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        contentType: "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    try {
      await axios.post(
        `/api/personal/editelement/${id.current}`,
        { element: newValue },
        config
      );

      const index = list.findIndex((element) => element._id === id.current);
      list[index].element = newValue;
      setList(list);

      updateModal();
    } catch (error) {
      localStorage.removeItem("authToken");
      setError("You are not authorized please login");
    }
  };

  const updateModal = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  };

  return error ? (
    <>
      {console.log(error)}
      <span>{error}</span>
    </>
  ) : (
    <>
      <div>{privateData.email}</div>
      <div>{privateData.username}</div>
      <button onClick={logoutHandler}>Logout</button>

      <Form onSubmit={saveValue}>
        <Form.Group className="mb-3">
          <Form.Label>Add Element</Form.Label>
          <Form.Control
            type="text"
            placeholder="Add Item"
            required
            id="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>

      {modal ? (
        <Form onSubmit={editValue}>
          <Form.Group className="mb-3">
            <Form.Label>Edit Element</Form.Label>
            <Form.Control
              type="text"
              placeholder="Edit Item"
              required
              id="text"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      ) : (
        <></>
      )}

      <div className="row my-3 mx-3">
        {list.map((element) => {
          return (
            <Element
              key={element._id}
              data={{ element, deleteValue, updateModal, modal, id }}
            />
          );
        })}
      </div>
    </>
  );
};

export default PrivateScreen;
