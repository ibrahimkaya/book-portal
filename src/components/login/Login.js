import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import fetch from "isomorphic-unfetch";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../../UserContext";
import LoginForm from "./LoginForm";

function Login() {
  const { setUser } = useContext(UserContext);

  const [usernamePassword, setUsernamePassword] = useState({
    username: "",
    password: "",
  });

  const history = useHistory();

  const [usernamePasswordError, setUsernamePasswordError] = useState({
    username: null,
    password: null,
  });

  const handleChange = (e) => {
    const { currentTarget } = e;
    const { value, name } = currentTarget;

    setUsernamePassword({ ...usernamePassword, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = usernamePassword;

    if (username.length < 5 || username.length > 255) {
      setUsernamePasswordError({
        ...usernamePassword,
        username: "lütfen kullanıcı adını kontrol ediniz",
      });
      return;
    } else {
      setUsernamePasswordError({
        username: null,
      });
    }

    if (password.length < 3 || password.length > 255) {
      setUsernamePasswordError({
        ...usernamePassword,
        password: "lütfen şifrenizi kontrol ediniz",
      });
      return;
    }

    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    fetch("http://localhost:8081/login", {
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
      credentials: "include",
    })
      .then((r) => {
        if (r.ok) {
          return r;
        }
        if (r.status === 403) {
          return Promise.reject(new Error("kullanıcı adı veya şifre yanlış"));
        }
        if (r.status === 401 || r.status === 500) {
          return r;
        }
      })
      .then((response) => response.json())
      .then((response) => {
        toast.success("giriş işlemi başarılı yönlendiriliyorsunuz!");
        console.log(response);
        setUser({
          isLoggedIn: true,
          username: response.username,
          role: response.roles[0].name,
        });
        setTimeout(() => {
          history.push("/dashboard");
        }, 2000);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  return (
    <div>
      <LoginForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        setUsernamePassword={setUsernamePassword}
        usernamePassword={usernamePassword}
        usernamePasswordError={usernamePasswordError}
      ></LoginForm>
    </div>
  );
}

export default Login;
