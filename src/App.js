import React, { useState } from 'react';
import './App.css';
import Category from './Components/Category';
import Instruction from './Components/Instruction';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CategoryContext from './Components/Context/CategoryContext';
import Quiz from './Components/Quiz';
import Score from './Components/Score';
function App() {
  const [category, setCategory] = useState(null);
  const [correctAns, setCorrectAns] = useState([]);
  const [givenAns, setGivenAns] = useState([]);
  const [questionsArray, setQuestionsArray] = useState([]);
  return (
    <>
      <CategoryContext.Provider value={{ category, setCategory, correctAns, setCorrectAns, givenAns, setGivenAns, questionsArray, setQuestionsArray }}>
        <Router>
          <Routes>
            <Route path="/" exact element={<Category />} />
            <Route path="/instruction" exact element={<Instruction />} />
            <Route path="/quiz" exact element={<Quiz />} />
            <Route path="/score" exact element={<Score />} />
          </Routes>
        </Router>
      </CategoryContext.Provider>
    </>
  );
}

export default App;
