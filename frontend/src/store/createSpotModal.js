import { csrfFetch } from './csrf';
import { useSelector } from 'react-redux';

const CREATE_SPOT = "/spotsAYYYYYYY";

let initialState ={show:false};

const createSpot = (spot)=>{
  console.log("Creating this spot")
  return {
    type: CREATE_SPOT,
    payload: spot
  }
}

export const createNewSpot = (newSpot)=> async dispatch =>{
  const {address, city, state, country, name, description, price, ownerId} = newSpot
  const res = await csrfFetch(`/api/spots`, {
    method: 'POST',
    body: JSON.stringify({
      address, city, state, country, name, description, price, ownerId
    })
  })
  if(res.ok){
    const data = await res.json();
    initialState = {show: false}
    return dispatch(createSpot(data))
  }
}





const createSpotReducer = (state = initialState, action) => {
  let newState = {...state};
  switch (action.type) {
    case CREATE_SPOT:
      const spot = action.payload
      console.log(spot)
      newState = {...newState, ...spot};
      console.log('NEW SPOT', newState)
      return newState;

    default:
      return newState;
  }
};
export default createSpotReducer;
