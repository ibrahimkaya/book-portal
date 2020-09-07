import React from "react";
import { Icon, Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

const DashboardPanel = (props) => {
  const history = useHistory();

  const UserButton = () => {
    if (props.role === "ROLE_ADMIN") {
      return (
        <Button
          toggle
          active={props.activeMenu === "users"}
          onClick={() => {
            props.setActiveMenu("users");
          }}
          id="users"
        >
          Kullanıcılar
        </Button>
      );
    } else {
      return null;
    }
  };

  const PanelButton = () => {
    if (props.role === "ROLE_ADMIN") {
      return (
        <Button
          onClick={() => {
            history.push({
              pathname: "/admin",
              state: { opType: "create", selection: props.activeMenu },
            });
          }}
        >
          <Icon circular inverted color="teal" name="add" />
        </Button>
      );
    } else {
      return null;
    }
  };

  return (
    <Button.Group floated="left">
      <Button
        toggle
        active={props.activeMenu === "books"}
        onClick={() => {
          props.setActiveMenu("books");
        }}
        id="books"
      >
        Kitaplar
      </Button>
      <Button
        toggle
        active={props.activeMenu === "authors"}
        onClick={() => {
          props.setActiveMenu("authors");
        }}
        id="authors"
      >
        Yazarlar
      </Button>
      <UserButton />
      <PanelButton />
    </Button.Group>
  );
};

export default DashboardPanel;
