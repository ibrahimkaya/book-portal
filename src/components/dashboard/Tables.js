import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../UserContext";
import { Input, Grid } from "semantic-ui-react";

import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import BookTable from "./tables/BookTable";
import AuthorTable from "./tables/AuthorTable";
import UserTable from "./tables/UserTable";
const Tables = (props) => {
  const {user, setUser } = useContext(UserContext);

  const [searchParams, setSearchParams] = useState("");
  const [tableData, setTableData] = useState();
  const [userReadList, setUserReadList] = useState();
  const [userFavList, setUserFavList] = useState();
  const [currentPage, setCurrentPage] = useState(0);

  const history = useHistory();

  useEffect(() => {
    fetchTablesBySelection();
    fetchFavOrReadLists("reads");
    fetchFavOrReadLists("favorites");
  }, []);

  useEffect(() => {
    fetchTablesBySelection();
  }, [currentPage]);

  useEffect(() => {
    fetchTablesBySelection();
  }, [searchParams]);

  useEffect(() => {
    setCurrentPage(0)
    fetchTablesBySelection();
  }, [props.activeMenu]);


  const changePageTo = (i) => {
    setCurrentPage(i);
  };

  const fetchFavOrReadLists = (selection) => {
    //selection => reads or favorites
    fetch("http://localhost:8081/api/users/" + selection, {
      method: "GET",
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
          // sayfa yenilenmeden session düşer ise login statülerinin çıkış yapılmış olarak güncellenmesi gerekli
          setUser({});

          history.push("/login");
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
          setUserReadList(data);
        } else if (selection === "favorites") {
          setUserFavList(data);
        }
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  const fetchTablesBySelection = () => {
    const selection = props.activeMenu;

    fetch(
      "http://localhost:8081/api/" +
        selection +
        "/" +
        searchParams +
        "?" +
        new URLSearchParams({ pageNumber: currentPage }),
      {
        method: "GET",
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
        if (r.status === 401) {
          setUser({});
          history.push("/login");
        }
        if (r.status === 403 || r.status === 500) {
          return Promise.reject(new Error("bilinmeyen bir hata oluştu!"));
        }
      })
      .then((r) => {
        return r.json();
      })
      .then((data) => {
        setTableData(data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const setEdit = (value) =>{
    
    if (user.role !== "ROLE_ADMIN") {
      return; 
    }
    if(value && value.id){
      history.push( {pathname: "/admin", state:  {userClickData: value, opType: "edit", selection: props.activeMenu, edit: true}})
    }
  }


  const drawTables = () => {
    if (tableData && props.activeMenu === "books") {
      return (
        <BookTable
          books={tableData}
          currentPage={currentPage}
          changePageTo={changePageTo}
          userFavList={userFavList}
          userReadList={userReadList}
          setUserFavList={setUserFavList}
          setUserReadList={setUserReadList}
          history={history}
          setEdit={setEdit}
        />
      );
    } else if (tableData && props.activeMenu === "authors") {
      return (
        <AuthorTable
          authors={tableData}
          currentPage={currentPage}
          changePageTo={changePageTo}
          history={history}
        />
      );
    } else if(tableData && props.activeMenu === "users") {
      return (
        <UserTable
          users={tableData}
          currentPage={currentPage}
          changePageTo={changePageTo}
          history={history}
        />
      );
    }
  };
  const searchBar = () => (
    <Input
      action={{ icon: "search" }}
      placeholder="Search..."
      type="text"
      onChange={(e) => {
        setSearchParams(e.target.value);
        changePageTo(0);
      }}
    />
  );

  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column>{searchBar()}</Grid.Column>
        </Grid.Row>
        <Grid.Row columns="equal" centered>
          <Grid.Column width={16}>{drawTables()}</Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Tables;
