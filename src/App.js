import React, {  useState,useEffect,useMemo } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Login from "./components/login/Login";
import  UserContext  from "./UserContext";
import NavBar from "./layouts/Navbar"
import { ToastContainer, toast } from 'react-toastify';

toast.configure();

function App() {

  const [user, setUser] = useState(null);

  const userProvider = useMemo( ()=>({user,setUser}),[user,setUser])




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
        this.setState({
          loggedInStatus: "LOGGED_IN",
          user: response,
          role: response.roles[0].name,
        });
      })
      .catch((e) => {
        console.log(e.message);
      });
  };


    return (
      <Router>
        <div>
          {(user && console.log( user +" "+user.isLoggedIn ))}
        <NavBar></NavBar>
          <Switch>
            <UserContext.Provider value={userProvider}>
            <Route
              exact
              path={"/dashboard"}
              render={(props) => (
           
                <Dashboard
                />
              )}
            />
             <Route
              exact
              path={"/login"}
              render={(props) => (
                  (user && user.isLoggedIn) ?
               <Redirect to="/dashboard"/> :<Login/>
              )}
            />
            
            </UserContext.Provider>
          </Switch>
        </div>
      </Router>
    );
}

export default App;
