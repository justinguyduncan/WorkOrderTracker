import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import LogoLight from '../../assets/logo-light.png';
import './splashpage.css'

import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function SplashPage() {
  const sessionUser = useSelector((state) => state.session.user);

  if (sessionUser) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="splash-container">
      <nav className="splash-nav">
        <div className="splash-logo">
          <img src={LogoLight} alt="Zumn" className="splash-logo-img" />
        </div>
        <div className="splash-nav-actions">
          <OpenModalButton buttonText="Log In" modalComponent={<LoginFormModal />} />
          <OpenModalButton buttonText="Sign Up" modalComponent={<SignupFormModal />} />
        </div>
      </nav>

      <main className="splash-hero">
        <div className="splash-badge">Work Order Management</div>
        <h1 className="splash-headline">
          Keep every job on track,<br />every department in sync.
        </h1>
        <p className="splash-sub">
          Zumn gives your team a single place to create, assign, and monitor work orders — sorted by priority and due date so nothing slips through the cracks.
        </p>
        <div className="splash-cta">
          <OpenModalButton buttonText="Log In to get started" modalComponent={<LoginFormModal />} />
        </div>
      </main>

      <div className="splash-features">
        <div className="splash-feature">
          <div className="splash-feature-icon">📋</div>
          <h3>Work Orders</h3>
          <p>Create and track jobs across all departments with real-time status updates.</p>
        </div>
        <div className="splash-feature">
          <div className="splash-feature-icon">⚡</div>
          <h3>Priority Sorting</h3>
          <p>High priority and overdue jobs rise to the top automatically.</p>
        </div>
        <div className="splash-feature">
          <div className="splash-feature-icon">🏢</div>
          <h3>Departments</h3>
          <p>Organize work by department so teams only see what's relevant to them.</p>
        </div>
      </div>
    </div>
  );
}

export default SplashPage;
