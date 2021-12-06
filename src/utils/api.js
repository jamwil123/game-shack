import axios from "axios";

const boardGamesAPI = axios.create({
  baseURL: "https://james-boardgames.herokuapp.com/api",
});

export const getReviews = () => {
  return boardGamesAPI.get("/reviews").then((res) => {
    return res.data.reviews;
  });
};

export const getCategories = () => {
  return boardGamesAPI.get("/categories").then((res) => {
    return res.data.categories;
  });
};

export const getQueryCategories = (slug) => {
  return slug === "All categories"
    ? getReviews()
    : boardGamesAPI.get(`/reviews?category=${slug}`).then((res) => {
        return res.data.reviews;
      });
};

export const getSingleReview = (review_id) => {
  return boardGamesAPI.get(`/reviews/${review_id}`).then((res) => {
    return res.data.reviews;
  });
};

export const getComments = (review_id) => {
  return boardGamesAPI.get(`/reviews/${review_id}/comments`).then((res) => {
    return res.data.comments;
  });
};

export const patchReviewLikes = (review_id, object) => {
  return boardGamesAPI.patch(`/reviews/${review_id}`, object).then((res) => {});
};

export const postComment = (comment, review_id) => {
  return boardGamesAPI
    .post(`/reviews/${review_id}/comments`, comment)
    .then((res) => {
      return res;
    });
};

export const deleteComment = (comment_id, review_id) => {
  return boardGamesAPI.delete(`/comments/${comment_id}`).then((res) => {
  });
};

export const getReviewsSorted = (query) => {
  return boardGamesAPI.get(`/reviews${query}`).then((res) => {
    return res.data.reviews
  });
};
