import React from "react";
import { StateContext } from "../App";

function Navigation({ user }) {
  const [state, dispatch] = React.useContext(StateContext);

  console.log(user);
  console.log(state.user);
  let timestamp = new Date();
  let data = {
    name: "Test",
    isLogin: true,
    expired: timestamp.setMinutes(timestamp.getMinutes() + 15),
  };

  const setUser = (data) => {
    dispatch({
      type: "SET_USER",
      payload: data,
    });
  };

  return (
    <div className="container">
      <div className="logo">
        <a href="/">Obscure</a>
      </div>
      <div className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item">
            <a href="/">Home</a>
          </li>
          <li className="navbar-item">
            <a href={"/about"}>About me</a>
          </li>
          <li className="navbar-item">
            {user.name ? (
              <a href={"/login"}>Sign out, {user.name}</a>
            ) : (
              <a href={"/login"}>Sign in</a>
            )}
          </li>
          <li onClick={() => setUser(data)}>Test</li>
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
