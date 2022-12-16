import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import CreateSpotModal from "./components/CreateSpotModal";
import Navigation from "./components/Navigation";
import SpotCards from "./components/SpotCards";
import SpotDetails from "./components/SpotDetails";
import * as sessionActions from "./store/session";




function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  // let show = useSelector(state=> state.createSpot.show)

  // const showCreate = ()=>{
  //   console.log('CRUD')
  //   show = true
  // }

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));

  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path={['/',"/spots"]}>
          <div>

                <button>Create New Spot</button>
                <CreateSpotModal></CreateSpotModal>


            </div>
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
