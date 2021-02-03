import React from "react";
import { reducer, initialState, StateContext } from "./reducer";
import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import BlogPostPage from "./pages/BlogPostPage";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <div className="app">
      <StateContext.Provider value={[state, dispatch]}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/post/:id" component={BlogPostPage} />
          <Route path="/article/:id" component={BlogPostPage} />
          <Route>
            <ErrorPage user={state.user} />
          </Route>
        </Switch>
      </StateContext.Provider>
    </div>
  );
}

export default App;
