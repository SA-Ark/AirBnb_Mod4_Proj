import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useHistory } from "react-router-dom";

import Navigation from "./components/Navigation";
import SpotCards from "./components/SpotCards";
import SpotDetails from "./components/SpotDetails";
import * as sessionActions from "./store/session";





function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);




  const [showCreateSpot, setShowCreateSpot] = useState(false);



    useEffect(() => {
      dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));


  }, [dispatch]);



  const toggleCreateSpot = ()=>{

    setShowCreateSpot(!showCreateSpot)

  }


  return (
    <>
      <Navigation isLoaded={isLoaded}></Navigation>
      {isLoaded && (
        <Switch>
          <Route exact path={['/',"/spots"]}>

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
