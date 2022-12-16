import { csrfFetch } from './csrf';

const GET_SPOTS = '/spots';
const CREATE_SPOT = "/spotsAYYYYYYY";


const findSpots = (spots) => {
    console.log("Finding all spots")
  return {
    type: GET_SPOTS,
    payload: spots
  };
};

const createSpot = (spot)=>{
  console.log("Creating this spot")
  return {
    type: CREATE_SPOT,
    payload: spot
  }
}

export const createNewSpot = (newSpot, url)=> async dispatch =>{
  const {address, city, state, country, name, description, price, ownerId} = newSpot
  const res = await csrfFetch(`/api/spots`, {
    method: 'POST',
    body: JSON.stringify({
      address, city, state, country, name, description, price, ownerId
    })
  })
  if(res.ok){
    const data = await res.json();

    const {id} = data;
    const res2 = await csrfFetch(`/api/spots/${id}/images`,
    {method: "POST",
    body: JSON.stringify({
      url,
      preview: true
    })
  })
  if(res2.ok){
    data.previewImage = url
    // data.avgStarRating = "0";
    await dispatch(createSpot(data))

  }

  }
}



export const findAllSpots = () => async dispatch => {
  const res = await csrfFetch('/api/spots/');
  // console.log(res)
  if(res.ok){
    const data = await res.json();

    // console.log(data)
   await dispatch(findSpots(data));
   return data;
  }
}



const initialState = {};
const spotsReducer = (state = initialState, action) => {
  let newState = {...state};
  switch (action.type) {
    case GET_SPOTS:
      const spots = action.payload
      newState = {...spots};
      console.log("NEW STATE", newState)
      return newState;
    case CREATE_SPOT:
      let newSpot = action.payload
      console.log(newSpot, "NEWSPOTTTTTTT")
      newState.Spots.push(newSpot)
      return newState
    default:
      return newState;
  }
};
export default spotsReducer;
