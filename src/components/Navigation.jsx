import React from "react";
import { Link } from "react-router-dom";
import { StateContext } from "../reducer";

function Navigation() {
  const [state, dispatch] = React.useContext(StateContext);

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <div className="container">
      <div className="logo">
        <Link to="/">Obscure</Link>
      </div>
      <div className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to={"/about"}>About me</Link>
          </li>
          <li className="navbar-item">
            {state.user.name ? (
              <Link to={"/"} onClick={logout}>
                Sign out, {state.user.name}
              </Link>
            ) : (
              <Link to={"/login"}>Sign in</Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
