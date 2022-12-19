import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { findAllSpots } from '../../store/spots';
import './SpotCards.css';


function Spotcards() {
    const dispatch = useDispatch()

    let allSpots = useSelector(state => state.spots);
    useEffect(() => {

        dispatch(findAllSpots())
    }, [dispatch])

let history = useHistory()
const redirect = (spotId) =>{
    let path = `/spots/${spotId}`

    history.push(path)
}


    if (allSpots && Object.values(allSpots).length) {

        allSpots = Object.values(allSpots)

    } else {

        return (null)
    }
    console.log(allSpots[0])

    // return  (


    //     <ul className="all-spots">
    //         {allSpots[0].map( spot => (
    //         <span key={spot.id}>
    //             <li>{spot.previewImage}</li>
    //             <button onClick={()=>redirect(spot.id)}>Spot Details</button>
    //         </span>
    //         ))}
    //   </ul>

    // );

    return  (


        <div className="all-spots">
            {allSpots[0].map( spot => (
            <div key={spot.id} className="spot-card">
                <div key={spot.ownerId} className="card-body">
                <img src={spot.previewImage}/>
                <p>{spot.avgRating}, {spot.city}, {spot.state}, {spot.price}</p>
                <p>{spot.description}</p>
                <button onClick={()=>redirect(spot.id)}>Spot Details</button>
            </div>
            </div>
            ))}
      </div>

    );

}


export default Spotcards;
