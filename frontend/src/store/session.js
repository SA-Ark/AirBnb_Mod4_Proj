// frontend/src/store/session.js
import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
    console.log("User in action:", user)
  return {
    type: SET_USER,
    payload: user
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  console.log(credential, password)

  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });

  const data = await response.json();
  console.log("DATA", data)

  dispatch(setUser(data));
  return response;
};


export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

  export const signup = (user) => async (dispatch) => {
    const { username, firstName, lastName, email, password } = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        firstName,
        lastName,
        email,
        password,
      }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };

  export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
  };

  const initialState = { user: null };

  const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
      case SET_USER:
        newState = Object.assign({}, state);
        const actionPayload = action.payload
        console.log(actionPayload, "!!!!!!", newState)
        newState.user = actionPayload;
        console.log(newState)
        return newState;
      case REMOVE_USER:
        newState = Object.assign({}, state);
        newState.user = null;
        return newState;
      default:
        return state;
    }
  };
export default sessionReducer;