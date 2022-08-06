import { useState } from "react";
import axios from "../../axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/forgotpassword",
        { email },
        config
      );
      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <Form onSubmit={forgotPasswordHandler}>
      <h3>Forgot Password</h3>
      {error && <span>{error}</span>}
      {success && <span>{success}</span>}
      <Form.Group className="mb-3">
        <p>
          Please enter the email address you register your your account with. We
          will send you reset password confirmation to this email.
        </p>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          required
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Send reset password Link
      </Button>
    </Form>
  );
};

export default ForgotPasswordScreen;
