import React, { useEffect } from "react";
import { getReviews, getReviewsSorted } from "../utils/api";
import { Link } from "react-router-dom";
import UpVotes from "./CommentVotes";
import  NavDropdown from "./NavDropdown"
const Home = ({ reviews, setReviews, setReviewID, categories  }) => {
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    setReviews(array);
  }

  useEffect(() => {
    getReviews().then((reviews) => {
      shuffle(reviews);
    });
  }, []);

  const sortByVotes = (e) => {
    getReviewsSorted(`?sort_by=votes&order=${e.target.value}`).then((res) => {
      setReviews(res);
    });
  };

  const sortByTime = (e) => {
    getReviewsSorted(`?sort_by=created_at&order=${e.target.value}`).then((res) => {
      setReviews(res);
    });
  };

  

  return (
    <React.Fragment>
    <div className= 'SortBySection'>
    <select className='SortByVotes' onChange={(e)=> {sortByVotes(e)}}>
    <option disabled selected>Sort By Likes</option>
    <option value = 'desc'>Highest First</option>
    <option value = 'asc'>Lowest First</option>
    </select>
    <select className='SortByDate' onChange={(e)=> {sortByTime(e)}}>
    <option disabled selected>Sort By Date Added</option>
    <option value = 'asc'>Posted First</option>
    <option value = 'desc'>Most Recent</option>
    </select>
    <NavDropdown categories={categories} setReviews={setReviews} />
    </div>
    
      <div className="Home">
        {reviews.map((review) => {
          return (
            <React.Fragment>
              <img
                src={review.review_img_url}
                alt={review.title}
                className="HomeImg"
              ></img>
              <p className="TitleName">{review.title}</p>
              <p className="ReviewBody">{review.review_body}</p>
              <div className="ButtonSection">
                <Link to={`/reviews/${review.review_id}`}>
                  <button
                    className="CommentButton"
                    onClick={() => {
                      setReviewID(review.review_id);
                    }}
                  >
                    {review.comment_count} comments!
                  </button>
                </Link>
                <UpVotes review={review} />
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default Home;
