import React from "react";
import { Form, Button } from "react-bootstrap";

function LoginPage() {
  const TEST_PASSWORD = "353356365361366353356365361366";
  const TEST_EMAIL = "admin@example.com";

  const [passwordInput, setPasswordInput] = React.useState("");
  const [emailInput, setEmailInput] = React.useState("");
  const [user, setUser] = React.useState({ name: "", isLogin: false });

  const validateUser = () => {
    const passwordArray = passwordInput.split("");
    const cryptedPassword = passwordArray
      .map((value) => value.charCodeAt(0) ^ 256)
      .join("");

    if (emailInput !== TEST_EMAIL) {
      alert("Неправильный email");
      return false;
    }

    if (cryptedPassword !== TEST_PASSWORD) {
      alert("Неправильный password");
      return false;
    }

    setUser({ name: emailInput, isLogin: true });
    return true;
  };

  React.useEffect(() => {
    if (user.isLogin) {
      window.location.pathname = "";
    }
  }, [user]);

  return (
    <div className="login">
      <div className="login-container">
        <Form onSubmit={validateUser}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
