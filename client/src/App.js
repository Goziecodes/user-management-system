import React, { Suspense, useContext } from "react";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Login from "./pages/login.jsx";
import Home from "./pages/index.jsx";
import SignUp from "./pages/signup.jsx";
import Verify from "./pages/verify.jsx";
import Nav from "./components/Nav.jsx";
import NewPost from "./pages/newPost.jsx";
import PostPage from "./components/PostPage.jsx";
import ProfilePage from "./pages/profilePage.jsx";
import UploadPicture from "./pages/uploadPicture.jsx";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import AppShell from "./AppShell";
import Forgot from "./pages/forgot.jsx";
import ResetPassword from "./pages/resetPassword.jsx";
import Admin from "./pages/admin.jsx";
import AdminMore from "./components/AdminMore.jsx";

const LoadingFallback = () => (
  <AppShell>
    <div className="p-4">Loading...</div>
  </AppShell>
);

const UnauthenticatedRoutes = () => (
  <Switch>
    <Route path="/login">
      <AppShell>
        <Login />
      </AppShell>
    </Route>
    <Route path="/signup">
      <AppShell>
        <SignUp />
      </AppShell>
    </Route>
    <Route exact path="/verify">
      <Verify />
    </Route>
    <Route exact path="/forgot">
      <Forgot />
    </Route>
    <Route exact path="/reset">
      <ResetPassword />
    </Route>
    <Route exact path="/">
      <AppShell>
        <Home />
      </AppShell>
    </Route>
    <Route exact path="/admin">
      <AppShell>
        <Admin />
      </AppShell>
    </Route>
    <Route exact path="/admin/more">
      <AppShell>
        <AdminMore />
      </AppShell>
    </Route>
  </Switch>
);

const AuthenticatedRoute = ({ children, ...rest }) => {
  const auth = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={() =>
        !!auth.isAuthenticated() ? (
          <AppShell>{children}</AppShell>
        ) : (
          <Redirect to="/" />
        )
      }
    ></Route>
  );
};

// const AdminRoute = ({ children, ...rest }) => {
//   const auth = useContext(AuthContext);
//   const { authState } = auth;

//   return (
//     <Route
//       {...rest}
//       render={() =>
//         auth.isAdmin() ? <AppShell>{children}</AppShell> : <Redirect to="/" />
//       }
//     ></Route>
//   );
// };

const AppRoutes = () => {
  return (
    <>
      <Suspense fallback={<LoadingFallback />}>
        <Switch>
          {/* <AdminRoute path="/new">
            <NewPost />
          </AdminRoute> */}
          <AuthenticatedRoute path="/new">
            <NewPost />
          </AuthenticatedRoute>

          <AuthenticatedRoute path="/post">
            <PostPage />
          </AuthenticatedRoute>

          {/* <AuthenticatedRoute path="/post">
            <PostPage />
          </AuthenticatedRoute> */}
          <AuthenticatedRoute path="/profile">
            <ProfilePage />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/upload">
            <UploadPicture />
          </AuthenticatedRoute>
          <UnauthenticatedRoutes />
        </Switch>
      </Suspense>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="">
          <AppRoutes />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

// function App() {
//   return (
//     <>
//       {/* <Nav /> */}
//       <BrowserRouter>
//         <Switch>
//           <Route exact path="/" component={Home} />
//           <Route exact path="/login" component={Login} />
//           <Route exact path="/signup" component={SignUp} />
//           <Route exact path="/verify" component={Verify} />
//           <Route exact path="/new" component={NewPost} />
//           <Route exact path="/post" component={PostPage} />
//           <Route exact path="/profile" component={ProfilePage} />
//           <Route exact path="/upload" component={UploadPicture} />
//         </Switch>
//       </BrowserRouter>
//     </>
//   );
// }

export default App;
