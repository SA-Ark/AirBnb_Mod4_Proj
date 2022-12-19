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
    console.log(show)
    const showModal = ()=>{
        console.log('SHOW')
        setShow(true)
    }

    const toggleReviews = ()=>{
        setShowReviews(!showReviews)
    }

    if(user && user.user){
        user = user.user.id
    }




// let spotImage;
// let spotData;
// if(Object.keys(Spot).length){
//     if(Spot.SpotImages){


//     for (let image of Spot.SpotImages){
//         if(image.preview === true){
//             spotImage = image
//             break;
//         }
//     }
// }
// }
// spotData = {...Spot}
// // delete spotData[15]
// delete spotData.SpotImages
// console.log(Spot.SpotImages, "WHAT")
//  spotData.SpotImage= spotImage?.url
// // spotData[15]= Spot.Owner
// console.log(spotData, "SPOTDATA")


let SpotKeys = []
    if (Object.keys(Spot).length) {


       SpotKeys = Object.keys(Spot)

    } else {

        return (null)
    }

//     <div className="all-spots">
//     {allSpots[0].map( spot => (
//     <div key={spot.id} className="spot-card">
//         <div key={spot.ownerId} className="card-body">
//         <img src={spot.previewImage}/>
//         <p>{spot.description}</p>
//         <button onClick={()=>redirect(spot.id)}>Spot Details</button>
//     </div>
//     </div>
//     ))}
// </div>

    return (

        <div className="all-details">
            <h2>{Spot.description}</h2>
             <div className="details-card">
                <h5>{Spot.name}</h5>
                <p>{Spot.avgStarRating} {Spot.numReviews !== 0? "stars" : null} | {Spot.numReviews} reviews  |  {Spot.city}, {Spot.state}, {Spot.country} </p>
                <div className="img-div">
                <img src={Spot.previewImage}/>
                </div>
                <p>{Spot.address}</p>
                <h3>Entire home hosted by: {Spot.Owner}</h3>
                <h5>${Spot.price}/ Night</h5>


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


    );

}


export default SpotDetails;
