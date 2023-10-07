import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Icon from './work-order-management-1.png';
import './splashpage.css'

import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function SplashPage() {
  // Assuming you have isLoaded and sessionUser defined in your component

  const sessionUser = useSelector((state) => state.session.user);

  // Redirect if the user is already authenticated
  if (sessionUser) {
    return <Redirect to="/dashboard" />;
  }

  return !sessionUser &&(
    <div className="spalsh-container">
      <div className="splash-header">
        <h1> <img src={Icon} alt="Work Order Management"/>JobTracker </h1>

          <div className="user-buttons">
            <OpenModalButton
              buttonText="Log In"
              modalComponent={<LoginFormModal />}
            />
            <OpenModalButton
              buttonText="Sign Up"
              modalComponent={<SignupFormModal />}
            />
          </div>
      </div>
      <div className="splash-body">
        <p>Welcome to JobTracker, a platform desgined to streamline and optimize the process of managing work orders and tasks within your organization. At JobTracker, we understand the challenges of keeping track of work orders, assigning tasks, and ensuring everything runs smoothly. That's why we've created an intuitive and efficient solution to simplify your workflow. With JobTracker, you can effortlessly create, manage, and assign tasks to specific departments or team members.</p>
      </div>
    </div>
  );
}

export default SplashPage;
