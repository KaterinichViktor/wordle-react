// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import GuessNumber from './GuessNumber';
import WordleClassic from './WordleClassic';
import WordleHard from './WordleHard';



const App = () => {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wordle-classic" element={<WordleClassic />} />
        <Route path="/wordle-hard" element={<WordleHard />} />
        <Route path="/guess-my-code" element={<GuessNumber />} />
      </Routes>
    </Router>
  );
};

export default App;

