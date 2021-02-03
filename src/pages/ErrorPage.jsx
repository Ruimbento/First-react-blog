import React from "react";
import { Link } from "react-router-dom";

import Navigation from "../components/Navigation";

function ErrorPage({ user }) {
  return (
    <div id="errorPage">
      <header>
        <Navigation />
      </header>
      <div className="error">
        <h2 className="error-text">404 Error</h2>
        <Link to="/">
          <button className="error-button">Go home</button>
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
