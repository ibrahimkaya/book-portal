import React, { useState } from "react";
import { Container, Grid, Button, Dropdown } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import BookEdit from "./book/BookEdit";

const AdminPage = (props) => {
  const history = useHistory();
  const [activeSelection, setActiveSelection] = useState(
    props.location.state.selection
  );

  const dropDownOptions = [
    {
      key: "users",
      text: "Kullanıcı",
      value: "users",
      icon: "user",
    },
    {
      key: "books",
      text: "Kitap",
      value: "books",
      icon: "book",
    },
    {
      key: "authors",
      text: "Yazar",
      value: "authors",
      icon: "pencil",
    },
  ];

  const CustomDropdown = () => {
    return (
      <Dropdown
        placeholder="Kullanıcı/Kitap/yazar"
        fluid
        selection
        options={dropDownOptions}
        onChange={handleOnChangeDropdown}
      ></Dropdown>
    );
  };

  const handleOnChangeDropdown = (e, data) => {
    setActiveSelection(data.value);
  };

  const editFormSelection = () => {
    if (activeSelection === "books" && props.location && props.location.state) {
      return (
        <BookEdit
          userClickData={props.location.state.userClickData}
          edit={props.location.state.edit}
        />
      );
    }
  };

  return (
    <div>
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={1} floated="left">
              <Button
                circular
                icon="arrow alternate circle left outline"
                onClick={() => {
                  history.push("/dashboard");
                }}
              />
            </Grid.Column>
            <Grid.Column width={3} floated="left">
              <CustomDropdown />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>{editFormSelection()}</Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
};

export default AdminPage;
