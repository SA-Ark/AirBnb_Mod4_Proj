import './ReviewForm.css' ;
import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewReview } from '../../store/reviews';
import { findSpotDetailsBySpotId } from '../../store/spotDetails';
import { useModal } from '../../context/Modal';
import './ReviewForm.css'

function ReviewForm() {
    const [review, setReview] = useState("");
    const [stars, setStars] = useState(5);
    const dispatch = useDispatch()
    const Spot = useSelector(state => state.spotDetails);
    const User = useSelector(state => state.session)
    const username = User.user?.username
    const [reviewCreated, setReviewCreated] = useState(false)
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();


    useEffect( () => {

         dispatch(findSpotDetailsBySpotId(Spot.id))
    }, [reviewCreated])

    const {id, numReviews, avgStarRating} = Spot
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const newReview = {review, stars}
        
        setReviewCreated(!reviewCreated)

         await dispatch(createNewReview(newReview, id, username)).then(closeModal).catch(async (res) => {
            const data = await res.json();
            data.errors = Object.values(data.errors)
            if (data && data.errors) setErrors(data.errors)});
            }

    return (
        <>
          <h1>Create Review Form</h1>
          <div className="create-review-form">
          <form onSubmit={handleSubmit}>
          <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
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
                type="number"
                placeholder="Stars"
                value={stars}
                onChange={(e) => setStars(e.target.value)}
                required
              />
            </label>
            <button type="submit" className="submit-create-review">Create Review</button>
            </form>
            </div>
            </>
            )
}

export default ReviewForm;
