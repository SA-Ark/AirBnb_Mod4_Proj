import React, { useEffect, useState} from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { findSpotDetailsBySpotId } from '../../store/spotDetails';
import { deleteSpotBySpotId } from '../../store/spotDetails';
import OpenModalButton from '../OpenModalButton';
import ReviewsDiv from '../ReviewsDiv';


import EditSpotModal from '../EditSpotModal';


import './SpotDetails.css';


function SpotDetails() {
    const dispatch = useDispatch()
    const {spotId} = useParams()


    useEffect(() => {

        dispatch(findSpotDetailsBySpotId(spotId))
    }, [dispatch])

const history = useHistory();
const handleDelete = () =>{
    history.push('/spots')
    dispatch(deleteSpotBySpotId(spotId))
}




    let Spot = useSelector(state => state.spotDetails);
    let user = useSelector(state => state.session);
    const [show, setShow] = useState(false);
    const [showReviews, setShowReviews] = useState(false)

  

    const toggleReviews = ()=>{
        setShowReviews(!showReviews)
    }

    if(user && user.user){
        user = user.user.id
    }






let SpotKeys = []
    if (Object.keys(Spot).length) {


       SpotKeys = Object.keys(Spot)

    } else {

        return (null)
    }



    return (
        <div className="whole-thing">

        <div className="all-details">
                <h2>{Spot.name}</h2>

             <div className="details-card">
                <div className="above-spot">
                <p className="star-avg">
                ★{Spot.avgStarRating}
                </p>
                <p>
                {Spot.numReviews} reviews
                </p>
                <p>
                {Spot.city}, {Spot.state}
                </p>
                <p>
                {Spot.country}
                </p>


                 </div>
                <div className="img-div">
                <img src={Spot.previewImage}/>
                </div>
                <p>{Spot.address}</p>
                <div className="price-div">
                <h3>Entire home hosted by: {Spot.Owner}</h3>
                <h3>${Spot.price}/ Night</h3>
                </div>


             </div>

            {Spot.ownerId === user?
            <div>
                <button onClick={handleDelete}>Delete Spot</button>
                {/* <button onClick={showModal}>Update Spot</button>

                {show? <EditSpotModal></EditSpotModal>: null} */}
                <OpenModalButton
                modalComponent={<EditSpotModal></EditSpotModal>}
                buttonText="Update Spot"
                />
                </div>
                :<p>To edit or delete this spot you must be logged in and be its owner.</p>}
                {showReviews?
                <span>
                    <button onClick={toggleReviews}>Hide Reviews</button>
                    <ReviewsDiv></ReviewsDiv>
                </span>
                :
                <button onClick={toggleReviews}>Show Reviews</button>}

            </div>

            </div>
    );

}


export default SpotDetails;
