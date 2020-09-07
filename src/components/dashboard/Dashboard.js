import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../UserContext";
import DashboardPanel from "./DashboardPanel";
import Tables from "./Tables"

const Dashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const [activeMenu, setActiveMenu] = useState("books");
 

  return (
    <div>
      <p> dashboard active selection = {activeMenu && activeMenu}</p>
      <br></br>
      <DashboardPanel
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        role={user.role}
      />
      <br/>
      <Tables activeMenu={activeMenu} />
      <br></br>
      <div>
        <br />
        {user && user.username}
        {JSON.stringify(user)}
      </div>
    </div>
  );
};

export default Dashboard;
