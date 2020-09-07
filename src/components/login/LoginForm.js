import React from "react";
import { Container, Grid, Divider, Form, Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

function LoginForm(props){

    const history=useHistory()

    return(
        <div>
        <Container>
        <Grid>
          <Grid.Row columns="equal" centered>
            <Grid.Column width={8}>
              <Form
                onSubmit={props.handleSubmit}
                onReset={(e) => {
                  e.preventDefault();
                  props.setUsernamePassword({
                    username: "",
                    password: "",
                  });
                }}
              >
                <Form.Field>
                  <label>Kullanıcı adı</label>
                  <Form.Input
                    type="email"
                    required
                    name="username"
                    error={props.usernamePasswordError.username}
                    value={props.usernamePassword.username}
                    onChange={props.handleChange}
                    placeholder="Kullanıcı adı"
                  />
                </Form.Field>

                <Form.Field>
                  <label>Şifre </label>
                  <Form.Input
                    type="password"
                    name="password"
                    required
                    error={props.usernamePasswordError.password}
                    value={props.usernamePassword.password}
                    onChange={props.handleChange}
                    placeholder="Şifre"
                  />
                </Form.Field>

                <Button.Group fluid>
                  <Button type="submit" color="teal">
                    Griş yap!
                  </Button>

                  <Button type="reset">Sıfırla</Button>
                </Button.Group>
                <Divider />
                {true && (
                  <Button
                    color="yellow"
                    type="button"
                    onClick={() => {
                      history.push("/");
                    }}
                  >
                    Kayıt Ol!
                  </Button>
                )}
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
    )
}

export default LoginForm