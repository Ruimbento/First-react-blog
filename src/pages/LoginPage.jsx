import React from "react";
import { Form, Button } from "react-bootstrap";
import { StateContext } from "../reducer";
import { useHistory } from "react-router-dom";

function LoginPage() {
  const TEST_PASSWORD = "353356365361366353356365361366";
  const TEST_EMAIL = "admin@example.com";

  const [state, dispatch] = React.useContext(StateContext);
  const [passwordInput, setPasswordInput] = React.useState("");
  const [emailInput, setEmailInput] = React.useState("");

  const history = useHistory();

  const validateUser = (e) => {
    e.preventDefault();

    const passwordArray = passwordInput.split("");
    const cryptedPassword = passwordArray
      .map((value) => value.charCodeAt(0) ^ 256)
      .join("");

    if (emailInput !== TEST_EMAIL) {
      alert("Неправильная почта");
      return false;
    }

    if (cryptedPassword !== TEST_PASSWORD) {
      alert("Неправильный пароль");
      return false;
    }

    setUser();
  };

  const setUser = () => {
    let timestamp = new Date();

    dispatch({
      type: "LOGIN",
      payload: {
        name: emailInput,
        isLogin: true,
        expired: timestamp.setMinutes(timestamp.getMinutes() + 15),
      },
    });
  };

  React.useEffect(() => {
    if (state.user.isLogin) {
      history.push("/");
    }
  }, [state.user.isLogin]);

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
          <Form.Group controlId="formButtons" className="formButtons">
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button
              variant="danger"
              type="button"
              onClick={(event) => {
                event.preventDefault();
                history.push("/");
              }}
            >
              Go Home
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
