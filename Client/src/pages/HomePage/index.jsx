import React from "react";
import { Home , NotLoggedPage} from "../../components";
import LoginPage from "../LoginPage"

export default function HomePage() {

  const user = localStorage.getItem("user");
  return <> {user ? <Home /> : <NotLoggedPage />} </>;

  
}
