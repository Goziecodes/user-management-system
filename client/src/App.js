import React from "react";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Login from "./pages/login.jsx";
import Home from "./pages/index.jsx";
import SignUp from "./pages/signup.jsx";
import Verify from "./pages/verify.jsx";
import Nav from "./components/Nav.jsx";
import NewPost from "./pages/newPost.jsx";
import PostPage from "./components/PostPage.jsx";
import ProfilePage from "./pages/profilePage.jsx";

function App() {
  return (
    <>
      <Nav />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/verify" component={Verify} />
          <Route exact path="/new" component={NewPost} />
          <Route exact path="/post" component={PostPage} />
          <Route exact path="/profile" component={ProfilePage} />
          {/* <Route exact path='/checkout' component={CheckoutPage} />
        <Route
          exact
          path='/login'
          render={() =>
            currentUser ? <Redirect to='/' /> : <Login />
          }
          /> */}
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
