import './ReviewForm.css' ;
import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewReview } from '../../store/reviews';
import { findSpotDetailsBySpotId } from '../../store/spotDetails';


function ReviewForm() {
    const [review, setReview] = useState("");
    const [stars, setStars] = useState(5);
    const dispatch = useDispatch()
    const Spot = useSelector(state => state.spotDetails);
    const User = useSelector(state => state.session)
    const username = User.user?.username
    const [reviewCreated, setReviewCreated] = useState(false)

    console.log(Spot, "SPOT TRY GET ID")
    useEffect( () => {

         dispatch(findSpotDetailsBySpotId(Spot.id))
    }, [reviewCreated])

    const {id, numReviews, avgStarRating} = Spot
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const newReview = {review, stars}
        console.log(newReview, id)
        setReviewCreated(!reviewCreated)
        
         await dispatch(createNewReview(newReview, id, username))
    }
    return (
        <>
          <h1>Create Review Form</h1>
          <form onSubmit={handleSubmit}>

            <label>
              review
              <input
                type="text"
                placeholder="Review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
              />
            </label>
            <label>
              stars
              <input
                type="text"
                placeholder="Stars"
                value={stars}
                onChange={(e) => setStars(e.target.value)}
                required
              />
            </label>
            <button type="submit">Create Review</button>
            </form>
            </>
            )
}

export default ReviewForm;