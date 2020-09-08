import React, { useContext } from "react";
import { Icon, Button, Table, Label, Menu } from "semantic-ui-react";
import { toast } from "react-toastify";
import UserContext from "../../../UserContext";

const BookTable = (props) => {
  const { user } = useContext(UserContext);

  const isUserFavorited = (bookId) => {
    if (props.userFavList) {
      for (let i = 0; i < props.userFavList.length; i++) {
        if (props.userFavList[i].id === bookId) {
          return true;
        }
      }
    }
    return false;
  };

  const isUserReaded = (bookId) => {
    if (props.userReadList) {
      for (let i = 0; i < props.userReadList.length; i++) {
        if (props.userReadList[i].id === bookId) {
          return true;
        }
      }
    }
    return false;
  };

  const addLists = (selection, bookId) => {
    //selection => reads or favorites
    fetch("http://localhost:8081/api/users/" + selection + "/" + bookId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((r) => {
        if (r.ok) {
          return r;
        }
        if (r.status === 401) {
          props.history.push("/login");
        }
        if (r.status === 403 || r.status === 500) {
          return Promise.reject(new Error("bilinmeyen bir hata oluştu!"));
        }
      })
      .then((r) => {
        return r.json();
      })
      .then((data) => {
        if (selection === "reads") {
          props.setUserReadList(data);
        } else if (selection === "favorites") {
          props.setUserFavList(data);
        }
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={3}>index</Table.HeaderCell>
          <Table.HeaderCell>Id</Table.HeaderCell>
          <Table.HeaderCell>Kitap ismi</Table.HeaderCell>
          <Table.HeaderCell>Author</Table.HeaderCell>
          <Table.HeaderCell>Isbn</Table.HeaderCell>
          <Table.HeaderCell> Favori/Okuma Listesi</Table.HeaderCell>
          {user.role === "ROLE_ADMIN" ? (
            <Table.HeaderCell> Sil / Geri al </Table.HeaderCell>
          ) : (
            ""
          )}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {props.books &&
          props.books.content &&
          props.books.content.map((value, index) => (
            <Table.Row>
              <Table.Cell>
                <Label ribbon>
                  {props.books.size * props.currentPage + index + 1}
                </Label>
              </Table.Cell>
              <Table.Cell
                onClick={() => {
                  props.setEdit(value);
                }}
              >
                {value.id}
              </Table.Cell>
              <Table.Cell>{value.title} </Table.Cell>
              <Table.Cell>{value.author && value.author.name}</Table.Cell>
              <Table.Cell>{value.isbn}</Table.Cell>
              <Table.Cell disabled={!value.active}>
                <Button as="div" labelPosition="right" pointing="rigth">
                  <Button
                    color={isUserFavorited(value.id) ? "red" : "grey"}
                    onClick={() => addLists("favorites", value.id)}
                  >
                    <Icon name="heart" />
                  </Button>
                </Button>
                <Button as="div" labelPosition="right" pointing="left">
                  <Button
                    basic
                    color={isUserReaded(value.id) ? "blue" : "grey"}
                    onClick={() => addLists("reads", value.id)}
                  >
                    <Icon name="book" />
                  </Button>
                </Button>
              </Table.Cell>
              {user.role === "ROLE_ADMIN" ? (
                <Table.Cell>
                  <Button
                    onClick={() => props.deleteBySelection(value.id)}
                    icon={value.active ? "delete" : "redo"}
                  ></Button>
                </Table.Cell>
              ) : (
                ""
              )}
            </Table.Row>
          ))}
      </Table.Body>

      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan="2">
            <Label icon="info" size="mini">
              <p>
                Toplam {props.books.totalElements} Kitaptan{" "}
                {props.books.numberOfElements}
                kaydı görüntülemektesiniz
              </p>
            </Label>
          </Table.HeaderCell>
          <Table.HeaderCell colSpan="5">
            <Menu floated="right" pagination>
              <Menu.Item
                onClick={() => {
                  props.changePageTo(props.currentPage - 1);
                }}
                as="a"
                icon
                disabled={props.books.first}
              >
                <Icon name="chevron left" />
              </Menu.Item>
              {[...Array(props.books.totalPages).keys()].map((value, index) => (
                <Menu.Item
                  as="a"
                  onClick={() => {
                    props.changePageTo(index);
                  }}
                  active={props.books.number === index}
                >
                  {index + 1}
                </Menu.Item>
              ))}

              <Menu.Item
                onClick={() => {
                  props.changePageTo(props.currentPage + 1);
                }}
                as="a"
                icon
                disabled={props.books.last}
              >
                <Icon name="chevron right" />
              </Menu.Item>
            </Menu>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

export default BookTable;
