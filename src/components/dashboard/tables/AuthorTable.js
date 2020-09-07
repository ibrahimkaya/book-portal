import React from "react";
import { Icon,  Table, Label, Menu } from "semantic-ui-react";

const AuthorTable = (props) =>{


    return (
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={3}>İndex</Table.HeaderCell>
              <Table.HeaderCell>Id</Table.HeaderCell>
              <Table.HeaderCell>Adı</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
  
          <Table.Body>
            {props.authors &&
              props.authors.content &&
              props.authors.content.map((value, index) => (
                <Table.Row disabled={!value.active}>
                  <Table.Cell>
                    <Label ribbon>
                      {props.authors.size * props.currentPage + index + 1}
                    </Label>
                  </Table.Cell>
                  <Table.Cell>{value.id}</Table.Cell>
                  <Table.Cell>{value.name}</Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
  
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell size="small">
                <Label icon="info" size="mini">
                  <p>
                    {" "}
                    toplam {props.authors.totalElements} yazardan{" "}
                    {props.authors.numberOfElements} kaydı görüntülemektesiniz{" "}
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
                    disabled={props.authors.first}
                  >
                    <Icon name="chevron left" />
                  </Menu.Item>
                  {[...Array(props.authors.totalPages).keys()].map((value, index) => (
                    <Menu.Item
                      as="a"
                      onClick={() => {
                        props.changePageTo(index);
                      }}
                      active={props.authors.number === index}
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
                    disabled={props.authors.last}
                  >
                    <Icon name="chevron right" />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      );

}

export default AuthorTable