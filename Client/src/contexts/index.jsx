import React, { createContext, useState , useContext} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userData,setUserData] = useState({
        username: "",
        generalxp: 0,
        subjectxpmaths: 0,
        subjectxpenglish:0,
        subjectxpscience: 0,
        favcolor:""
    })

    const [tasks,setTasks] = useState([])

    return (
        <AuthContext.Provider value={{ user, setUser, userData,setUserData, tasks, setTasks}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
