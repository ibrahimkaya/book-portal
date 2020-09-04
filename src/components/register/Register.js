import React, { useState } from "react";
import { toast } from "react-toastify";
import fetch from "isomorphic-unfetch";
import { withRouter, useHistory } from "react-router-dom";
import RegisterForm from "./RegisterForm";
const Register = () => {
  const history = useHistory();

  const [usernamePasswordAndRepeat, setUsernamePasswordAndRepeat] = useState({
    username: "",
    password: "",
    passwordRepeat: "",
  });

  const [usernamePasswordError, setUsernamePasswordError] = useState({
    usernameErr: null,
    passwordErr: null,
    passwordRepeatErr: null,
  });

  const handleChange = (e) => {
    const { currentTarget } = e;
    const { value, name } = currentTarget;

    setUsernamePasswordAndRepeat({
      ...usernamePasswordAndRepeat,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, passwordRepeat } = usernamePasswordAndRepeat;

    if (username.length < 5 || username.length > 255) {
      setUsernamePasswordError({
        usernameErr: "lütfen kullanıcı adını kontrol ediniz",
      });
      return;
    } else {
      setUsernamePasswordError({
        usernameErr: null,
      });
    }

    if (password.length < 3 || password.length > 255) {
      setUsernamePasswordError({
        passwordErr: "lütfen şifrenizi kontrol ediniz",
      });
      return;
    } else {
      setUsernamePasswordError({
        passwordErr: null,
      });
    }

    if (password !== passwordRepeat) {
      setUsernamePasswordError({
        passwordErr: "Şifrelerin aynı olması gerekli",
        passwordRepeatErr: "Şifrelerin aynı olması gerekli",
      });
      return;
    } else {
      setUsernamePasswordError({
        passwordErr: null,
        passwordRepeatErr: null,
      });
    }

    var fetchStatu = "";

    fetch("http://localhost:8081/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((r) => {
        if (r.ok) {
          return r;
        }
        if (r.status === 401 || r.status === 403 || r.status === 500) {
          fetchStatu = "rejected";
          return r;
        }
      })
      .then((response) => response.json())
      .then((r) => {
        if (fetchStatu === "rejected") {
          toast.error(r.error);
          return Promise.reject(new Error(r));
        }
        return r;
      })
      .then((response) => {
        toast.success(
          "başarılı bir kayıt alındı!, Giriş sayfasına yönlendiriliyorsunuz"
        );
        setTimeout(() => {
          history.push("/login");
        }, 3000);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  return (
    <div>
      <RegisterForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        usernamePasswordAndRepeat={usernamePasswordAndRepeat}
        usernamePasswordError={usernamePasswordError}
      />
    </div>
  );
};

export default withRouter(Register);
