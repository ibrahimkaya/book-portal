import React, { useState, useEffect, useMemo } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./components/login/Login";
import Logout from "./components/logout/Logout";
import Register from "./components/register/Register";

import UserContext from "./UserContext";
import NavBar from "./layouts/Navbar";
import { ToastContainer, toast } from "react-toastify";

toast.configure();

function App() {
  const [user, setUser] = useState(null);

  const userProvider = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    tryGetAuthUser();
  }, []);

  const tryGetAuthUser = () => {
    fetch("http://localhost:8081/api/users/profile", {
      method: "GET",
      credentials: "include",
    })
      .then((r) => {
        if (r.ok) {
          return r;
        }
        if (r.status === 401 || r.status === 403 || r.status === 500) {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {},
          });
          return Promise.reject(new Error("bilinmeyen bir hata oluştu!"));
        }
      })
      .then((response) => response.json())
      .then((response) => {
        setUser({
          isLoggedIn: true,
          username: response.username,
          role: response.roles.name,
        });
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <UserContext.Provider value={userProvider}>
            <Route
              exact
              path={"/dashboard"}
              render={(props) =>
                user && user.isLoggedIn === true ? (
                  <Dashboard />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path={"/login"}
              render={(props) =>
                user && user.isLoggedIn ? (
                  <Redirect to="/dashboard" />
                ) : (
                  <Login />
                )
              }
            />
            <Route exact path={"/logout"} render={(props) => <Logout />} />
            <Route
              exact
              path={"/"}
              render={(props) =>
                user && user.isLoggedIn ? (
                  <Redirect to="/dashboard" />
                ) : (
                  <Register />
                )
              }
            />
            <Route path="*">
              <p> 404 Aradığınız sayfa bulunamadı! </p>
            </Route>
          </UserContext.Provider>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
