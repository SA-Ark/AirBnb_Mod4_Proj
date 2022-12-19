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


   

    return  (


        <div className="all-spots">
            {allSpots[0].map( spot => (
            <div key={spot.id} className="spot-card">
                <div key={spot.ownerId} className="card-body" onClick={()=>redirect(spot.id)}>
                <img src={spot.previewImage} />
                <div className="spot-rating">
                <li className="city-state">{spot.city}, {spot.state}</li>
                    <li className="star">★{spot.avgRating}</li>

                    </div>
                <p className="price">${spot.price}/Night</p>

                {/* <button onClick={()=>redirect(spot.id)}>Spot Details</button> */}
            </div>
            </div>
            ))}
      </div>

    );

}


export default Spotcards;
