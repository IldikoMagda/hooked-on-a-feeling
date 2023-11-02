import React from "react";
import { Home } from "../../components";
import LoginPage from "../LoginPage";

export default function HomePage() {
  console.log(localStorage.getItem("user"));
  const user = localStorage.getItem("user");
  return <>{user ? <Home /> : <LoginPage />} </>;
}
