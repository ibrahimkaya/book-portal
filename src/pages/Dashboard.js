import React,{useState,useEffect, useContext} from "react"
import  UserContext  from "../UserContext"


const Dashboard = () =>{
    const {user,setUser} = useContext(UserContext)

    return(
        <div>
            <p> dashboard</p>
            <div>
                {( user && user.username)}
                {JSON.stringify(user)}
            </div>

        </div>
    )

}

export default Dashboard