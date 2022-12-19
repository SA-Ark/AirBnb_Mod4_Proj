import './Reviews.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getReviewsBySpotId } from '../../store/reviews';
import { deleteReviewByReviewId } from '../../store/reviews';
import spotDetailsReducer, { findSpotDetailsBySpotId } from '../../store/spotDetails';
import OpenModalButton from '../OpenModalButton';
import ReviewForm from '../ReviewForm';


function ReviewsDiv() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const [deleted, setDeleted] = useState(false);
    useEffect(() => {
        dispatch(getReviewsBySpotId(spotId))
        dispatch(findSpotDetailsBySpotId(spotId))
    }, [deleted])

    let reviews = useSelector(state => state.reviews?.Reviews)
    let user = useSelector(state => state.session.user)

    let reviewsOk;
    reviews ? reviewsOk = Object.keys(reviews) : reviewsOk = null
    if (reviews) {

        console.log(reviews["0"], reviews, "REVIEWS")
        console.log(reviews.map(review => review.id))

    }

    const [showReview, setShowReview] = useState(false)

    const showReviewForm = () => {
        setShowReview(true)
    }
    const handleDelete = async (reviewId) => {
        console.log("Hi", reviewId)
        setDeleted(!deleted)

        await dispatch(deleteReviewByReviewId(reviewId))

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
            <div className='all-reviews'>

                {reviewsOk?.length ? reviews?.map((review) =>

                    <div key={review.User.id}>
                        <p>{`${review.User.firstName} ${review.User.lastName}:${review.review}, ${review.stars} stars`}</p>
                        {user && user.id === review.User.id ?

                            <button key={review.id} onClick={() => handleDelete(review.id)}>Delete Review</button>
                            : null
                        }
                    </div>)

                    : <p>No reviews</p>}
            </div>
            <div className="reviewModal">


            {user ?
                //             <button onClick = {showReviewForm}>Create A New Review</button>
                //             : null
                //
                //             {showReview? <ReviewForm></ReviewForm>:null}
                <OpenModalButton
                    modalComponent={<ReviewForm></ReviewForm>}
                    buttonText="Create A New Review"
                />: <p>Login to create a new review</p>
            }
              </div>
        </div>
    )
}
export default ReviewsDiv;
