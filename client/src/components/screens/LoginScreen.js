import { useState, React, useEffect } from "react";
import axios from "../../axios";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/");
    }
  }, [navigate]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
        config
      );

      localStorage.setItem("authToken", data.token);

      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <Form onSubmit={loginHandler}>
      {error && <span>{error}</span>}
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          required
          id="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          tabIndex={1}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          Password:
          <Link to="/forgotpassword" tabIndex={4}>
            Forgot Password
          </Link>
        </Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          required
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          tabIndex={2}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
      <span>
        Don't have an account?<Link to="/register">Register</Link>
      </span>
    </Form>
  );
};

export default LoginScreen;
