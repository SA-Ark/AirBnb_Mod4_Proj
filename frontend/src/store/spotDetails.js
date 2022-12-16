import { csrfFetch } from './csrf';


const GET_SPOT_DETAILS = "/spots/:spotId";
const DELETE_SPOT = '/spots/:spotId'


const findSpotDetails = (spot)=>{
  console.log("Finding this spot")
  return {
    type: GET_SPOT_DETAILS,
    payload: spot
  }
}
const deleteSpot = (spotId)=>{
  console.log(`Deleting spot #${spotId}`)
  return {
    type: DELETE_SPOT,

  }
}


export const deleteSpotBySpotId = (spotId)=> async dispatch =>{
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE'
  })
  if(res.ok){

      return dispatch(deleteSpot(spotId))
    }
  }



export const findSpotDetailsBySpotId = (spotId)=> async dispatch => {
  const res = await csrfFetch(`/api/spots/${spotId}`)
  if (res.ok){
    const data = await res.json();
    return dispatch(findSpotDetails(data))
  }
}

const initialState ={};
const spotDetailsReducer = (state = initialState, action) => {
  let newState = {...state};
  switch (action.type) {
    case GET_SPOT_DETAILS:
      const spot = action.payload
      newState = {...spot};
      console.log('SPOT DETAILS', newState)
      return newState;
    case DELETE_SPOT:
      return newState;
    default:
      return newState;
  }
};
export default spotDetailsReducer;
