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


    const [showReview, setShowReview] = useState(false)

    const showReviewForm = () => {
        setShowReview(true)
    }
    const handleDelete = async (reviewId) => {

        setDeleted(!deleted)

        await dispatch(deleteReviewByReviewId(reviewId))

    }



    return (
        <div>
            <div className='all-reviews'>

                {reviewsOk?.length ? reviews?.map((review) =>

                    <div key={review.User.id}>
                        <div className="reviews">
                            <div className="reviewer">
                            <h2 className="prof-pic">😍</h2>
                           <p className="name">{review.User.firstName} {review.User.lastName}:</p>
                        </div>
                            <p className="review">{review.review}</p>
                        </div>
                        {user && user.id === review.User.id ?

                            <button key={review.id} onClick={() => handleDelete(review.id)}>Delete Review</button>
                            : null
                        }
                    </div>)

                    : <p>No reviews</p>}
            </div>
            <div className="reviewModal">


            {user ?

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
