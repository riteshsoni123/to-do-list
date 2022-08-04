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
        const { data } = await axios.get("/api/private", config);
        setPrivateData(data);
        setList(data.list);
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

  const saveValue = (e) => {
    e.preventDefault();
  };

  return error ? (
    <>
      {console.log(error)}
      <span>{error}</span>
    </>
  ) : (
    <>
      {/* {console.log(list)} */}
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
          return <div>{element}</div>;
        })}
      </div>
    </>
  );
};

export default PrivateScreen;
