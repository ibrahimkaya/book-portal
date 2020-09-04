import React, { useEffect, useContext } from "react";
import { Container, Grid } from "semantic-ui-react";
import fetch from "isomorphic-unfetch";
import { toast } from "react-toastify";
import UserContext from "../../UserContext";
import { useHistory } from "react-router-dom";

const Logout = () => {
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    handleLogout();
  },[]);

  const history = useHistory();

  const handleLogout = () => {
    fetch("http://localhost:8081/logout", {
      method: "GET",
      credentials: "include",
    })
      .then((r) => {
        if (r.ok) {
          return r;
        }
        if (r.status === 401 || r.status === 403 || r.status === 500) {
          return Promise.reject(new Error("bilinmeyen bir hata oluştu!"));
        }
      })
      .then((response) => {
        setUser({
          isLoggedIn: false,
          username: "",
          role: "",
        });
        setTimeout(() => {
          history.push("/login");
        }, 2000);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  return (
    <div className="App">
      <Container>
        <Grid>
          <Grid.Row columns="equal" centered>
            <Grid.Column width={8}>
              <p> Başarı ile çıkış yaptınız </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
};

export default Logout;
