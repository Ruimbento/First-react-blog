import React from "react";

function Navigation() {
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
        </ul>
      </div>
    </div>
  );
}

export default Navigation;
