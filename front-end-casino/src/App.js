import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import "./styles/app.css";
import NavBar from "./NavBar";
import Home from "./routes/Home";
import GameList from "./routes/GameList";
import SignUpForm from "./routes/UserAuth/SignUpForm";
import LoginForm from "./routes/UserAuth/LoginForm";
import Profile from "./routes/UserAuth/Profile";
import CasinoApi from "./api";
import Blackjack from "./routes/GameRoutes/Blackjack";
import Poker from "./routes/GameRoutes/Poker";
import Roulette from "./routes/GameRoutes/Roulette";



function App() {
  const [games, setGames] = useState([]);
  const [user, setUser] = useState('');

  useEffect(() => {
    async function getGames() {
      let games = await CasinoApi.getGames();
      setGames(games);
    }
    getGames();
  }, []);


  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        setUser(decoded.username);
      } catch (err) {
        console.error("Error decoding token:", err);
        localStorage.removeItem("token");
        setUser('');
      }
    }
  }, [setUser]);

  async function logout() {
    setUser('');
    localStorage.removeItem("token");
    await CasinoApi.logout();
    return <Navigate to='/' />;
  }

  async function login(data) {
    let res = await CasinoApi.login(data);
    let decoded = jwtDecode(res.token);
    setUser(decoded.username);
    localStorage.setItem("token", res);
  }

  async function signUp(data) {
    let res = await CasinoApi.signup(data);
    login(res);
  }

  async function editUser(data) {
    let res = await CasinoApi.editUser(data);
    setUser(res.username);
  }

  // function to check if token is present or user logged in
  const isAuthenticated = () => {
    let token = localStorage.getItem("token");
    return !!token;
  }

  return (
    <div>
      <BrowserRouter>
        <NavBar logout={logout} user={user} setUser={setUser} />
          <Routes>
            <Route path="/signup" element={<SignUpForm signUp={signUp} />} />
            <Route path="/login" element={<LoginForm login={login} />} />
            <Route path="/profile" element={<Profile user={user} editUser={editUser} />} />

            <Route path="/games" element={<GameList games={games} />} />
            <Route path="/Blackjack" element={<Blackjack />} />
            <Route path="/Poker" element={<Poker />} />
            <Route path="/Roulette" element={<Roulette />} />

            <Route path="/" element={<Home games={games} isAuthenticated={isAuthenticated} />} />
            <Route path="*" element={<h1>404: Page Not Found</h1>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;