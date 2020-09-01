import React from 'react';
import Header from "./components/Header.js"
import Projects from "./components/Projects.js"
import {Helmet} from "react-helmet";
import './App.css';

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>Tic Tac Toe AI</title>
      </Helmet>
      <Header />
      <Projects />
    </div>
  );
}

export default App;
