import './Reviews.css' ;
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getReviewsBySpotId } from '../../store/reviews';
import { deleteReviewByReviewId } from '../../store/reviews';
import ReviewForm from '../ReviewForm';


function ReviewsDiv() {
    const dispatch = useDispatch();
    const {spotId} = useParams();
    const [deleted, setDeleted] = useState(false);
    useEffect(()=>{
        dispatch(getReviewsBySpotId(spotId))
    }, [deleted])

    let reviews = useSelector(state=> state.reviews?.Reviews)


    let reviewsOk;
    reviews?reviewsOk= Object.keys(reviews):reviewsOk = null
    if(reviews){

        console.log(reviews["0"], reviews, "REVIEWS")
        console.log(reviews.map(review=>review.id))

    }

    const [showReview, setShowReview] = useState(false)

    const showReviewForm = ()=>{
        setShowReview(true)
    }
    const handleDelete = (reviewId) =>{
        console.log("Hi", reviewId)
        setDeleted(!deleted)

        dispatch(deleteReviewByReviewId(reviewId))
        dispatch(getReviewsBySpotId(spotId))
    }


    // return (
    //     <div>
    //         <ul>
    //             {reviewsOk?.length? reviews?.map((review)=>
    //             <span>
    //                 <li key={review.id}>{`${review.id}:${review}`}</li>)
    //                 {showReview?  <button onClick={handleDelete(review.id)}>Delete Review</button>: null}

    //             </span>)
    //             : null
    //             }
    //         </ul>
    //         <button onClick = {showReviewForm}>Create A New Review</button>
    //         {showReview? <ReviewForm></ReviewForm>:null}
    //     </div>
    // )

    return (
        <div>
            <ul>
                {reviewsOk?.length? reviews?.map((review)=>

                    <li key={review.User.id}>{`${review.User.firstName} ${review.User.lastName}:${review.review}, ${review.stars} stars`}
                    <button key={review.id} onClick={()=>handleDelete(review.id)}>Delete Review</button></li>)

                    : <p>No reviews</p>}
            </ul>
            <button onClick = {showReviewForm}>Create A New Review</button>
            {showReview? <ReviewForm></ReviewForm>:null}
        </div>
    )
}
export default ReviewsDiv;
