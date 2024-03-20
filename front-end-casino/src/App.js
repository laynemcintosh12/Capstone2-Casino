import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import "./styles/app.css";
import NavBar from "./NavBar";
import Home from "./routes/Home";
import SignUpForm from "./routes/UserAuth/SignUpForm";
import LoginForm from "./routes/UserAuth/LoginForm";
import Profile from "./routes/UserAuth/Profile";
import CasinoApi from "./api";
import BlackjackGame from "./routes/GameRoutes/BlackjackMaster/BlackjackGame";
import Poker from "./routes/GameRoutes/Poker";
import Roulette from "./routes/GameRoutes/Roulette";
import Trivia from "./routes/Trivia/Trivia";



function App() {
  const [games, setGames] = useState([]);
  const [user, setUser] = useState('');
  const [balance, setBalance] = useState('');

  useEffect(() => {
    async function getGames() {
      let games = await CasinoApi.getGames();
      setGames(games);
    }
    getGames();
  }, []);


  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedBalance = localStorage.getItem("balance");
    if (storedToken && storedBalance) {
      try {
        const decoded = jwtDecode(storedToken);
        setUser(decoded.username);
        setBalance(storedBalance);
      } catch (err) {
        console.error("Error decoding token:", err);
        localStorage.removeItem("token");
        setUser('');
        localStorage.removeItem("balance");
        setBalance('');
      }
    }
  }, [setUser]);

  async function logout() {
    setUser('');
    localStorage.removeItem("token");
    localStorage.removeItem("balance");
    await CasinoApi.logout();
    return <Navigate to='/' />;
  }

  async function login(data) {
    let res = await CasinoApi.login(data);
    let decoded = jwtDecode(res);
    setUser(decoded.username);
    localStorage.setItem("token", res);
    getBalance(decoded.username);
  }

  async function getBalance(username) {
      const res = await CasinoApi.fetchBalance(username);
      setBalance(res);
      localStorage.setItem("balance", res);
  }

  async function signUp(data) {
    let res = await CasinoApi.signup(data);
    login(res);
  }

  // function to check if token is present or user logged in
  const isAuthenticated = () => {
    let token = localStorage.getItem("token");
    return !!token;
  }

  // function to route to not found page
  const goLogin = () => {
    return <Navigate to="/login" />
  }

  return (
    <div>
      <BrowserRouter>
        <NavBar logout={logout} user={user} setUser={setUser} balance={balance} setBalance={setBalance} />
          <Routes>
            <Route path="/signup" element={<SignUpForm signUp={signUp} />} />
            <Route path="/login" element={<LoginForm login={login} />} />
            <Route path="/profile" element={isAuthenticated() ? <Profile user={user} /> : goLogin()} />

            <Route path="/Blackjack" element={isAuthenticated() ? <BlackjackGame setBalance={setBalance} /> : goLogin()} />
            <Route path="/Poker" element={isAuthenticated() ? <Poker /> : goLogin()} />
            <Route path="/Roulette" element={isAuthenticated() ? <Roulette /> : goLogin()} />
            <Route path="/trivia" element={isAuthenticated() ? <Trivia setBalance={setBalance} /> : goLogin()} />

            <Route path="/" element={<Home games={games} />} />
            <Route path="*" element={<h1>404: Page Not Found</h1>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;