import { csrfFetch } from "./csrf";
import { findSpotDetailsBySpotId } from "./spotDetails";

const GET_REVIEWS_BY_SPOT_ID = "/api/spots/:spotId/reviews"
const CREATE_REVIEW_BY_SPOT_ID = "/api/spots/:spotId/reviews"
const DELETE_REVIEW = "/api/reviews/:reviewId"

const getReviews = (reviews)=>{
    console.log("making the state for reviews")
    return {
        type: GET_REVIEWS_BY_SPOT_ID,
        payload: reviews
    }
}

const createReview = (newReview)=>{
    console.log("Creating this review")
    return {
      type: CREATE_REVIEW_BY_SPOT_ID,
      payload: newReview
    }
  }

  const deleteReview = (reviewId)=>{
    console.log("deleting this review")
    return {
      type: DELETE_REVIEW,
      payload: reviewId
    }
  }


export const deleteReviewByReviewId = (reviewId)=> async dispatch =>{

    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: 'DELETE'
    })
    if(res.ok){

    await dispatch(deleteReview(reviewId))
      }
    }


export const getReviewsBySpotId = (spotId) => async dispatch =>{
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)
    if(res.ok){
        const data = await res.json();
        console.log(data, "ALL REVIEWS BABY")
        dispatch(getReviews(data))
    }
}

export const createNewReview = (newReview, spotId, username) => async dispatch =>{
    const {review, stars} = newReview;

    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify({review, stars})
    })
    if(res.ok){
        const data = await res.json();
        // data.username = username
       const res2 = await csrfFetch(`/api/spots/${spotId}/reviews`)
       if(res2.ok){
        const allReviews = await res2.json()
        await dispatch(createReview(data))
           dispatch(getReviews(allReviews))

       }
    }

}

const initialState = {};
const reviewsReducer = (state = initialState, action)=>{
    let newState = {...state};
    switch (action.type){
        case GET_REVIEWS_BY_SPOT_ID:
            const reviews = action.payload;

            newState = {...reviews}
            console.log(newState, "REVIEW USERNAME")
            return newState;
        case CREATE_REVIEW_BY_SPOT_ID:
            const newReview = action.payload;
            newState={...newState, ...newReview};
            return newState;
        case DELETE_REVIEW:
            console.log(Object.values(newState), "REVIEW VALUES DEBUG RENDER")
            // for (let review of )
            return newState
        default:
            return newState;
    }
}

export default reviewsReducer;
