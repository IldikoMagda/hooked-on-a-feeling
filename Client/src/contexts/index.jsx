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
        favcolor:"orange"
    })

    return (
        <AuthContext.Provider value={{ user, setUser, userData,setUserData}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
