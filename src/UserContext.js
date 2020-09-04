import { createContext } from "react" ;

 const UserContext = createContext({
    isLoggedIn: false,
    username: "",
    role: ""
});

export default UserContext;