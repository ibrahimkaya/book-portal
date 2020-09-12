import React from "react";
import { useHistory } from "react-router-dom";
import { Grid, Container, Icon, Segment, Button } from "semantic-ui-react";

const Navbar = () => {
  const history = useHistory();

  return (
    <div>
      <Container>
        <Grid>
          <Grid.Row columns="equal" centered>
            <Grid.Column width={3} floated={"right"}>
              <Segment clearing>
                <Button
                  as="h2"
                  floated="right"
                  onClick={() => {
                    history.push("/logout");
                  }}
                >
                  <Icon name="logout" color="teal" />
                </Button>
                <Button as="h2" floated="left" color="teal">
                  <Icon name="user" />
                </Button>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
};

export default Navbar;
