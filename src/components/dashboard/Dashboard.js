import React, { useState, useContext } from "react";
import { Grid, Container } from "semantic-ui-react";
import UserContext from "../../UserContext";
import DashboardPanel from "./DashboardPanel";
import Tables from "./Tables";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [activeMenu, setActiveMenu] = useState("books");

  return (
    <div>
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <DashboardPanel
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                role={user.role}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="equal" centered>
            <Grid.Column width={16}>
              <Tables activeMenu={activeMenu} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
};

export default Dashboard;
