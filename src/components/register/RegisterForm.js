import React from "react";
import { Form, Container, Grid, Button, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";

const RegisterForm = (props) => {
  return (
    <div>
      <Container>
        <Grid>
          <Grid.Row columns="equal" centered>
            <Grid.Column width={8}>
              <Form onSubmit={props.handleSubmit}>
                <Form.Field>
                  <label>Kullanıcı adı</label>
                  <Form.Input
                    type="email"
                    required
                    name="username"
                    error={props.usernamePasswordError.usernameErr}
                    value={props.usernamePasswordAndRepeat.username}
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
                    error={props.usernamePasswordError.passwordErr}
                    value={props.usernamePasswordAndRepeat.password}
                    onChange={props.handleChange}
                    placeholder="Şifre"
                  />
                </Form.Field>

                <Form.Field>
                  <label>Şifre tekrarı </label>
                  <Form.Input
                    type="password"
                    name="passwordRepeat"
                    required
                    error={props.usernamePasswordError.passwordRepeatErr}
                    value={props.usernamePasswordAndRepeat.passwordRepeat}
                    onChange={props.handleChange}
                    placeholder="Şifre tekrarı"
                  />
                </Form.Field>
                <Button.Group fluid>
                  <Button type="submit" color="teal">
                    Kayıt Ol!
                  </Button>
                </Button.Group>
                <Divider></Divider>
                <Link to="/login"> Hesabınız var mı ?</Link>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
};

export default RegisterForm;
