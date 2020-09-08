import React, { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import { toast } from "react-toastify";
import BookEditForm from "./BookEditForm";

const BookEdit = (props) => {
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

  const [titleErr, setTitleErr] = useState();
  const [authorErr, setAuthorErr] = useState();
  const [fetchMethod, setFetchMethod] = useState("POST");
  const [fetchPath, setFetchPath] = useState();

  useEffect(() => {
    //if props is not null and edit is true
    if (props.edit) {
      setFetchMethod("PUT");

      setFetchPath("http://localhost:8081/api/books/" + props.userClickData.id);

      setBook({
        title: props.userClickData.title,
        author: props.userClickData.author.name,
        isbn: props.userClickData.isbn,
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
    if (!(props.edit && name === "isbn")) {
      setBook({ ...book, [name]: value });
    }
  };

  const deleteBook = (e) =>{
    const bookId = e.target.value
    fetch(
      "http://localhost:8081/api/books/" +
        bookId 
        ,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    )
      .then((r) => {
        if (r.ok) {
          return r;
        }
        if (r.status === 401 || r.status === 403 || r.status === 500) {
          return Promise.reject(new Error("bilinmeyen bir hata oluştu!"));
        }
      })
      .then((r) => {
        return r.json();
      })
      .then((data) => {
        setBook({data});
      })
      .catch((e) => {
        console.log(e.message);
      });
  }

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

  return (
    <BookEditForm
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      book={book}
      userClickData={props.userClickData}
      edit={props.edit}
      authorErr={authorErr}
      titleErr={titleErr}
    />
  );
};
export default BookEdit;
