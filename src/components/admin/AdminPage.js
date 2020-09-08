import React, { useState, useEffect } from "react";
import { Container, Grid, Button, Dropdown } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import fetch from "isomorphic-unfetch";
import { toast } from "react-toastify";
import BookInputFrom from "./BookInputForm";

const AdminPage = (props) => {
  const history = useHistory();
  const [activeSelection, setActiveSelection] = useState(
    props.location.state.selection
  );
  const [titleErr, setTitleErr] = useState();
  const [authorErr, setAuthorErr] = useState();
  const [fetchMethod, setFetchMethod] = useState("POST");
  const [fetchPath, setFetchPath] = useState();

  const [book, setBook] = useState({
    id: "",
    active: "",
    createDate: "",
    operationType: "",
    updateDate: "",
    isbn: "",
    title: "",
    author: "",
  });
  useEffect(() => {
    console.log(props && props.location && props.location.state);

    //if props is not null and edit is true
    if (props.location && props.location.state && props.location.state.edit) {
      console.log(props.location.state.edit);
      setActiveSelection(props.location.state.selection);

      setFetchMethod("PUT");

      setFetchPath(
        "http://localhost:8081/api/books/" +
          props.location.state.userClickData.id
      );
      setBook({
        title: props.location.state.userClickData.title,
        author: props.location.state.userClickData.author.name,
        isbn: props.location.state.userClickData.isbn,
      });
    } else {
      setFetchPath("http://localhost:8081/api/books");
      setFetchMethod("POST");
    }
  }, []);

  const handleChange = (e) => {
    const { currentTarget } = e;
    const { value, name } = currentTarget;
    //is editing mode and isbn changes
    //do nothing
    if (
      !(
        props.location &&
        props.location.state &&
        props.location.state.edit &&
        name === "isbn"
      )
    ) {
      setBook({ ...book, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { title, author, isbn } = book;
    var fetchStatu = "";

    if (title.length < 5 || title.length > 255) {
      setTitleErr("Lütfen kitap başlığını kontrol ediniz");
      return;
    } else {
      setTitleErr();
    }

    if (author.length < 3 || author.length > 255) {
      setAuthorErr("lütfen yazar ismini kontrol ediniz");
      return;
    } else {
      setAuthorErr();
    }

    fetch(fetchPath, {
      method: fetchMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, author, isbn }),

      credentials: "include",
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
        toast.success("Kayıt başarılı");

        setBook({
          id: response.id,
          updateDate: response.updateDate,
          active: response.active,
          operationType: response.operationType,
          author: response.author.name,
          createDate: response.createDate,
          isbn: response.isbn,
          title: response.title,
        });
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

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
        <BookInputFrom
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          book={book}
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
