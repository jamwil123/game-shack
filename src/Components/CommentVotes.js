import { useState } from "react"
import { patchReviewLikes } from "../utils/api";
import React from "react"


const  UpVotes = ({review}) => {
    const [addedLikes, setAddedLikes] = useState(0);

const handleClick = () => {
     setAddedLikes((prevLikes) => prevLikes +1)
     const Obj = {inc_votes: 1 }
    patchReviewLikes(review.review_id, Obj ).catch(() => {
      setAddedLikes((prev) => {
        return prev - 1;
      });
    });
};

const handleClickAgain = () => {
    setAddedLikes((prevLikes) => prevLikes -1)
    const Obj = {inc_votes: -1 }
   patchReviewLikes(review.review_id, Obj).catch(() => {
     setAddedLikes((prev) => {
       return prev + 1;
     });
   });
};
let newTime = review.created_at.split('T')
return (
    <React.Fragment>
    <button onClick = {handleClick}>↑</button> 
    <button onClick = {handleClickAgain}>↓</button>
    <p>Likes: {review.votes + addedLikes}</p>
    <p>Posted on: {newTime[0]}</p>
    </React.Fragment>

)
}


export default UpVotes
