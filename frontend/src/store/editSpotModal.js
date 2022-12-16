import { csrfFetch } from './csrf';


const EDIT_SPOT = "/spots/:spotId";


const editSpot = (spot)=>{
  console.log("Editing this spot")
  return {
    type: EDIT_SPOT,
    payload: spot
  }
}

export const editSpotDetailsBySpotId = (spotId, newSpot)=> async dispatch =>{
  const {address, city, state, country, name, description, price} = newSpot
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    body: JSON.stringify({
      address, city, state, country, name, description, price
    })
  })
  if(res.ok){
    const data = await res.json();
    return dispatch(editSpot(data))
  }
}




const initialState = {};

const editSpotReducer = (state = initialState, action) => {
  let newState = {...state};
  switch (action.type) {
    case EDIT_SPOT:
      const spot = action.payload
      newState = { ...spot};
      console.log('NEW SPOT', newState)
      return newState;

    default:
      return newState;
  }
};
export default editSpotReducer;
