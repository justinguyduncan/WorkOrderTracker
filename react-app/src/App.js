import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LeftNavBar from "./components/LeftNavBar";
import Dashboard from "./components/dashboard/dashboard";
import DepartmentPage from "./components/departmentmanagement/departmentlist";
import SplashPage from "./components/splashpage"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));

  }, [dispatch]);

  return (
    <div className="app-container">
       {/* <Navigation isLoaded={isLoaded} /> */}
      {isLoaded && (

        <div className="content-container">
          <Route path="/">
            <LeftNavBar />
          </Route>

        <div className="main-container">
        <Switch>
           <Route exact path="/">
            <SplashPage />
           </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/departments/:departmentId">
            <DepartmentPage />
          </Route>
        </Switch>
        </div>
        </div>
      )}
    </div>
  );
}

export default App;
