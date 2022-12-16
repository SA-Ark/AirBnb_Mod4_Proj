import React, { useEffect, useState} from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { findSpotDetailsBySpotId } from '../../store/spotDetails';
import { deleteSpotBySpotId } from '../../store/spotDetails';

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
    const [show, setShow] = useState(false)
    console.log(show)
    const showModal = ()=>{
        console.log('SHOW')
        setShow(true)
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


console.log(user, "USER")
console.log(Spot, "SPOT")

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
        </div>
    );

}


export default SpotDetails;
