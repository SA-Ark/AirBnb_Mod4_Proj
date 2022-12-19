// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import CreateSpotModal from '../CreateSpotModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className="nav-link">
      <li>
        <NavLink exact to="/"><i className="fa-brands fa-airbnb">Home</i></NavLink>
      </li>
      {sessionUser?
    <div className= "create-spot-button-div">



    <OpenModalButton

      modalComponent={<CreateSpotModal></CreateSpotModal>}
      buttonText="AirBnb your home"
     

    />



      {isLoaded && (
        <li className="prof-button">
          <ProfileButton user={sessionUser} />
        </li>
      )}
       </div>
    :(isLoaded && <li className="prof-button">
    <ProfileButton user={sessionUser} />
  </li>)}
    </ul>
  );
}

export default Navigation;
