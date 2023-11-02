import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import * as Pages from "./pages";
import { Header } from './components'
import { AuthProvider } from "./contexts";
import "./App.css";
// import anime from 'animejs/lib/anime.es.js';

function App() {

  return (
    <>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Pages.HomePage />} />
          <Route path="/Leaderboard" element={<Pages.LeaderboardPage />} />
          <Route path="/Login" element={<Pages.LoginPage />} />
          <Route path="/CreateAccount" element={<Pages.CreateAccountPage />} />
        </Route>
      </Routes>
    </AuthProvider>
    </>
  );
}

export default App;
