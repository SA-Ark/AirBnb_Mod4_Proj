import { csrfFetch } from './csrf';


const GET_SPOT_DETAILS = "/spots/:spotId";
const DELETE_SPOT = '/spots/:spotId'


const findSpotDetails = (spot)=>{
 
  return {
    type: GET_SPOT_DETAILS,
    payload: spot
  }
}
const deleteSpot = (spotId)=>{

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
      let spot

        spot = action.payload

        if(spot.Owner && typeof spot.Owner !== "string"){

          spot.Owner = spot.Owner?.firstName + " " + spot.Owner?.lastName
        }


    if(spot.SpotImages){
        let spotImage;

        for(let image of spot.SpotImages){
          if(image.preview){
            spotImage = image.url
          }
        }
        delete spot.SpotImages;
        if(spotImage){

          spot.previewImage = spotImage
        }else{
          spot.previewImage = "no url was given for the image"
        }
      }else{
        spot.previewImage = spot.spotImage.url
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
