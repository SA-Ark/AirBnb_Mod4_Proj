import { csrfFetch } from './csrf';


const EDIT_SPOT = "/spots/:spotId";


const editSpot = (object)=>{

  return {
    type: EDIT_SPOT,
    payload: object
  }
}

export const editSpotDetailsBySpotId = (spotId, newSpot, spotImage, fName, lName, numReviews, avgStarRating)=> async dispatch =>{


  const {address, city, state, country, name, description, price} = newSpot
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    body: JSON.stringify({
      address, city, state, country, name, description, price
    })
  })
  if(res.ok){
    const data = await res.json();
    const res2 = await csrfFetch(`/api/spots/${spotId}/images`, {
      method: 'POST',
      body: JSON.stringify({
        url: spotImage,
        preview: true
      })
    })
    data.Owner = `${fName}, ${lName}`
    data.numReviews = numReviews;
    data.avgStarRating = avgStarRating
    if(res2.ok){
      const normalized = await res2.json()
      data.spotImage = normalized

    }
    dispatch(editSpot(data))
  }

}




const initialState = {};

const editSpotReducer = (state = initialState, action) => {
  let newState = {...state};
  switch (action.type) {
    case EDIT_SPOT:

      const spot = action.payload


      newState = { ...spot};

      newState = newState
      return newState;

    default:
      return newState;
  }
};
export default editSpotReducer;
