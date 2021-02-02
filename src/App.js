import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { reducer, initialState } from "./reducer";

import HomePage from "./pages/HomePage";
import BlogPostPage from "./pages/BlogPostPage";
import LoginPage from "./pages/LoginPage";

export const StateContext = React.createContext();

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  console.log(state.user);

  const route = function () {
    let URN = window.location.pathname;
    let pathArray = URN.split("/");

    switch (pathArray.length) {
      case 3:
        return getPost(pathArray);
      default:
        return getPage(pathArray);
    }
  };

  const getPage = function (pathArray) {
    switch (pathArray.pop()) {
      case "":
        return <HomePage />;
      case "about":
        return <span>About page</span>;
      case "login":
        return <LoginPage />;
      default:
        return <span>404</span>;
    }
  };

  const getPost = function (pathArray) {
    const postId = filterInt(pathArray.pop());

    if (postId >= 0) {
      switch (pathArray.pop()) {
        case "post":
          return <BlogPostPage postId={postId} type="posts" />;
        case "article":
          return <BlogPostPage postId={postId} type="articles" />;
        default:
          return <span>400</span>;
      }
    } else {
      return <span>400</span>;
    }
  };

  const filterInt = function (value) {
    if (/^([-+])?([0-9]+|Infinity)$/.test(value)) return Number(value);
    return NaN;
  };

  return (
    <div className="app">
      <StateContext.Provider value={[state, dispatch]}>
        {route()}
      </StateContext.Provider>
    </div>
  );
}

export default App;
