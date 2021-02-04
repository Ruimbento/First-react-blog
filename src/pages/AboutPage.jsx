import React from "react";
import { Link } from "react-router-dom";

import Navigation from "../components/Navigation";

function AboutPage() {
  return (
    <div id="errorPage">
      <header>
        <Navigation />
      </header>
      <div className="error">
        <h2 className="error-text">Few words about me:</h2>
        <p>...</p>
        <Link to="/">
          <button className="error-button">Go home</button>
        </Link>
      </div>
    </div>
  );
}

export default AboutPage;
