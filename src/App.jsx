import React from "react";
import Home from "./pages/Home";
import {Route,Routes} from 'react-router-dom'
import Login from "./components/Login"
import Player from "./components/Player"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </div>
  );
}

export default App;
