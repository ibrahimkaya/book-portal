import React from "react"
import { Icon,  Table, Label, Menu } from "semantic-ui-react";

const UserTable = (props) => {

    return (
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={3}>index</Table.HeaderCell>
              <Table.HeaderCell>Kullanıcı adı</Table.HeaderCell>
              <Table.HeaderCell>Id</Table.HeaderCell>
              <Table.HeaderCell>Yetki</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
  
          <Table.Body>
            {props.users &&
              props.users.content &&
              props.users.content.map((value, index) => (
                <Table.Row disabled={!value.active}>
                  <Table.Cell>
                    <Label ribbon>
                      {props.users.size * props.currentPage + index + 1}
                    </Label>
                  </Table.Cell>
                  <Table.Cell>{value.username}</Table.Cell>
                  <Table.Cell>{value.id}</Table.Cell>
               { 
                //TODO role objesini ayıramıyorum 
                //<Table.Cell>{value.roles[0].name}</Table.Cell> 
               }

                </Table.Row>
              ))}
          </Table.Body>
  
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="2">
                <Label icon="info" size="mini">
                  <p>
                    {" "}
                    toplam {props.users.totalElements} kullanıcıdan{" "}
                    {props.users.numberOfElements} kaydı görüntülemektesiniz{" "}
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
                    disabled={props.users.first}
                  >
                    <Icon name="chevron left" />
                  </Menu.Item>
                  {[...Array(props.users.totalPages).keys()].map((value, index) => (
                    <Menu.Item
                      as="a"
                      onClick={() => {
                        props.changePageTo(index);
                      }}
                      active={props.users.number === index}
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
                    disabled={props.users.last}
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

export default UserTable