import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Form,
  Button,
  Dropdown,
} from "semantic-ui-react";


const BookInputFrom = (props) => {



    return (
      <Form>
        <Form.Group>
          <Form.Input 
          name="id"
          value={props.edit? props.userClickData.id: props.book.id}
          placeholder="id"
          label="ID" 
          width={2} 
          />
          <Form.Input
              name="title"
              value={ props.book.title}
              error={props.titleErr}
              onChange={props.handleChange}
              label="İsim"
              placeholder="İsim"
              width={4}
              required
            />
            <Form.Input
              name="isbn"
              value={props.book.isbn}
              label="isbn"
              onChange={props.handleChange}
              placeholder="Isbn"
              width={4}
              required
              type='number'
            />
            <Form.Input
              name="author"
              value={ props.book.author}
              error={props.authorErr}
              onChange={props.handleChange}
              label="Yazar"
              placeholder="Yazar"
              width={4}
              required
            />
        </Form.Group>
        <Form.Group>
            <Form.Input
              name="operationType"
              label="Son işlem tipi"
              value={props.edit? props.userClickData.operationType: props.book.operationType}
              placeholder="Son işlem"
              width={3}
            />
            <Form.Input
              name="createDate"
              value={props.edit? props.userClickData.createDate: props.book.createDate}
              label="Oluşturulma tarihi"
              placeholder="Oluşturulma tarihi"
              width={5}
            />
          <Form.Input
              name="updateDate"
              value={props.edit? props.userClickData.updateDate: props.book.updateDate}
              label="Değiştirilme tarihi"
              placeholder="Değpiştirilme tarihi"
              width={5}
          />
          <Form.Input
              name="active"
              value={props.edit? (props.userClickData.active? "Aktif": "Silinmiş") : props.book.active}
              label="aktiflik"
              placeholder="aktiflik"
              width={2}
          />
        </Form.Group>
        <Button
          type="submit"
          icon="send"
          color='blue'
          circular
          onClick={props.handleSubmit}
        >
          
        </Button>
      </Form>
    );
  };

  export default BookInputFrom