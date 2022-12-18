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
    console.log(data)

    return dispatch(findSpotDetails(data))
  }
}

const initialState ={};
const spotDetailsReducer = (state = initialState, action) => {
  let newState = {...state};
  switch (action.type) {
    case GET_SPOT_DETAILS:
      let spot

        spot = action.payload
      
        if(spot.Owner && typeof spot.Owner !== "string"){

          spot.Owner = spot.Owner?.firstName + " " + spot.Owner?.lastName
        }

    console.log(spot, "SPOTTTTTT")
    if(spot.SpotImages){
        let spotImage;

        for(let image of spot.SpotImages){
          if(image.preview){
            spotImage = image.url
          }
        }
        delete spot.SpotImages;
        if(spotImage){

          spot.spotImage = spotImage
        }else{
          spot.spotImage = "no url was given for the image"
        }
      }else{
        spot.spotImage = spot.spotImage.url
      }
      newState = {...spot};

      return newState;
    case DELETE_SPOT:
      return newState;
    default:
      return newState;
  }
};
export default spotDetailsReducer;
