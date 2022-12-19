import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useHistory } from "react-router-dom";
import CreateSpotModal from "./components/CreateSpotModal";
import Navigation from "./components/Navigation";
import SpotCards from "./components/SpotCards";
import SpotDetails from "./components/SpotDetails";
import * as sessionActions from "./store/session";
import OpenModalButton from "./components/OpenModalButton";
// import { useModal } from "./context/Modal";



function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  let user = useSelector(state=> state.session.user)
  // const { closeModal } = useModal();


  const [showCreateSpot, setShowCreateSpot] = useState(false);
  const history = useHistory();
  // const showCreate = ()=>{
    //   console.log('CRUD')
    //   show = true
    // }

    useEffect(() => {
      dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));


  }, [dispatch]);



  const toggleCreateSpot = ()=>{

    setShowCreateSpot(!showCreateSpot)

  }


  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path={['/',"/spots"]}>

            {user?.id?
          <div>

                {

                <OpenModalButton

                  modalComponent={<CreateSpotModal></CreateSpotModal>}
                  buttonText="Create Spot"
                  // onButtonClick={()=>toggleCreateSpot()}
                  // onModalClose={closeModal}

                />

                }
            </div>
            : null
            }
          <SpotCards/>
          </Route>
          <Route path={'/spots/:spotId'}>
        <SpotDetails/>
          </Route>

        </Switch>
      )}
    </>
  );
}


export default App;
