import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Nav from './Components/Nav'
import Home from "./Components/Home"
import React, {useState} from "react"
import SingleReview from './Components/SingleReview';

function App() {
  const [reviews, setReviews] = useState([]);
  const [reviewID, setReviewID] = useState(0)
  const [categories, setCategories] = useState([]);

  return (
    <BrowserRouter>
    <Nav setReviews={setReviews} setCategories={setCategories}/>
    <Routes>
    <Route path='/' element={<Home reviews={reviews} setReviews={setReviews} setReviewID = {setReviewID} categories = {categories} setCategories = {setCategories}/>} />
    <Route path='/reviews/:review_id' element={<SingleReview reviewID = {reviewID} />}/>
    </Routes>
    

    </BrowserRouter>
    
  );
}

export default App;
