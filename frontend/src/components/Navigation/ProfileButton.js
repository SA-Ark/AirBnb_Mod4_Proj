// frontend/src/components/Navigation/ProfileButton.js

import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';



function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [showOtherMenu, setShowOtherMenu] = useState(false)
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };



    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);
  const toggleMenu = ()=>{
    setShowMenu(!showMenu)
    setShowOtherMenu(!showOtherMenu)

  }
  const logout = (e) => {
    e.preventDefault();
    setShowMenu(false)
    dispatch(sessionActions.logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (

    <>

      <button onClick={toggleMenu} className ="icon-button">

      <i className="fas fa-user-circle"></i>

      </button>
      <ul className={ulClassName} ref={ulRef}>



        {user ?

        (showMenu?

          <div className="drop-down">

            <li>{user.username}</li>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>

          </div>

        : null) : ( showOtherMenu &&
          <>
          <div className="log-signup">
            <li>
              <OpenModalButton
                buttonText="Log In"
                modalComponent={<LoginFormModal />}
              />
            </li>
            <li>
              <OpenModalButton
                buttonText="Sign Up"
                modalComponent={<SignupFormModal />}
              />
            </li>
            </div>
          </>
        )}
</ul>
</>

  );
}

export default ProfileButton;
