import React, { useEffect, useState } from "react";
import {
  getSingleReview,
  getComments,
  postComment,
  deleteComment,
} from "../utils/api";
import { useParams } from "react-router-dom";

export default function SingeReview() {
  const [SingleReview, setSingleReview] = useState([]);
  const [comments, setComments] = useState([]);
  const { review_id } = useParams();

  useEffect(() => {
    getSingleReview(review_id).then((res) => {
      setSingleReview(res);
    });
  }, []);

  useEffect(() => {
    getComments(review_id).then((res) => {
      setComments(res);
    });
  }, []);

  const handleComment = (name, body) => {
    let newComment = {
      username: name,
      body: body,
    };
    postComment(newComment, review_id).then((res) => {
      window.location.reload(true);
    });
  };

  const handleDeleteClick = (comment_id) => {
    deleteComment(comment_id, review_id).then((res) => {
      window.location.reload(true);
    });
  };

  return (
    <div className="SingleReview">
      {SingleReview.map((review) => {
        return (
          <div>
            <img src={review.review_img_url}></img>
            <p className="SingleReviewTitle">{review.title}</p>
            <p className="SingleReviewBody">{review.review_body}</p>
          </div>
        );
      })}

      {comments.map((comment) => {
        let updatedTimeStamp = comment.created_at.split("T");
        let newNewTimeStamp = updatedTimeStamp[0].toString().split('-')
        return (
          <div className="CommentSection">
            
            <p className="CommentAuthor">User name: {comment.author} <button
            className="CommentXButton"
            onClick={(e) => {
              handleDeleteClick(comment.comment_id);
            }}
          >
            X
          </button></p>
            <p className="CommentBody">Comment: {comment.body}</p>
            <p className="CommentTime">Posted At: {`${newNewTimeStamp[2]}-${newNewTimeStamp[1]}-${newNewTimeStamp[0]}`}</p>
            <p className="CommentVotes">Votes: {comment.votes} </p>
          </div>
        );
      })}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleComment(e.target[0].value, e.target[1].value);
        }}
      >
        <input
          type="text"
          placeholder="Username"
          className="CommentFormUser"
        ></input>
        <textarea
          className="CommentBox"
          placeholder="Write something.."
        ></textarea>
        <button
          className="CommentButton"
          type="submit"
          className="CommentSubmitButton"
        >
          Comment
        </button>
      </form>
    </div>
  );
}
