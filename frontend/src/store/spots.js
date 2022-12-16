import { csrfFetch } from './csrf';

const GET_SPOTS = '/spots';


const findSpots = (spots) => {
    console.log("Finding all spots")
  return {
    type: GET_SPOTS,
    payload: spots
  };
};




export const findAllSpots = () => async dispatch => {
  const res = await csrfFetch('/api/spots/');
  // console.log(res)
  if(res.ok){
    const data = await res.json();
    // console.log(data)
   return dispatch(findSpots(data));
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
    default:
      return newState;
  }
};
export default spotsReducer;
