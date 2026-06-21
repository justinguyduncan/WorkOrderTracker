import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import * as departmentActions from '../../store/department';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import Navigation from '../Navigation';
import { useTheme } from '../../context/Theme';
import "./LeftNavBar.css";

function LeftNavBar() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { theme, toggleTheme } = useTheme();
  const departments = useSelector((state) => state.departmentReducer.departments);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (sessionUser) {
      dispatch(departmentActions.fetchDepartments());
    }
  }, [dispatch, sessionUser]);

  // Close sidebar on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  if (!sessionUser) return null;

  return (
    <>
      <button className='hamburger-btn' onClick={() => setIsOpen(true)}>
        <FontAwesomeIcon icon={faBars} />
      </button>

      {isOpen && <div className='sidebar-overlay' onClick={() => setIsOpen(false)} />}

      <div className={`left-navbar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className='icon-user'>
          <Navigation />
          <button className='sidebar-close-btn' onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className='department-container'>
          <h2>Departments</h2>
          {departments.map((department) => (
            <Link key={department.id} to={`/departments/${department.id}`}>
              {department.name}
            </Link>
          ))}
        </div>
        <button className='theme-toggle' onClick={toggleTheme}>
          <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />
          {theme === 'dark' ? ' Light Mode' : ' Dark Mode'}
        </button>
      </div>
    </>
  );
}

export default LeftNavBar;
