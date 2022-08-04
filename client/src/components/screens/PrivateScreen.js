import { React, useState, useEffect } from "react";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";

const PrivateScreen = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);

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
  }, []);

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
      console.log("error");
      localStorage.removeItem("authToken");
      setError("You are not authorized please login");
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

      <form onSubmit={saveValue}>
        <div>
          <label htmlFor="value">Input</label>
          <input
            type="text"
            required
            id="text"
            placeholder="Enter to-do"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <button type="submit">Save</button>
      </form>

      <div>
        {list.map((element) => {
          return <div key={element._id}>{element.element}</div>;
        })}
      </div>
    </>
  );
};

export default PrivateScreen;
