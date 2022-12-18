import React, { useEffect, useState} from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { findSpotDetailsBySpotId } from '../../store/spotDetails';
import { deleteSpotBySpotId } from '../../store/spotDetails';
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

    return (

        <div >
            <ul>
             {SpotKeys.map((key)=>
                 <li key={key}>{`${key}:${Spot[key]}`}</li>
                 )}
            </ul>
            {Spot.ownerId === user?
            <div>
                <button onClick={handleDelete}>Delete Spot</button>
                <button onClick={showModal}>Update Spot</button>

                {show? <EditSpotModal></EditSpotModal>: null}
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
