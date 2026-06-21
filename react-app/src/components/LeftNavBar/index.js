import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as departmentActions from '../../store/department';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import Navigation from '../Navigation';
import ProfileButton from '../Navigation/ProfileButton';
import { useTheme } from '../../context/Theme';
import "./LeftNavBar.css";

function LeftNavBar() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { theme, toggleTheme } = useTheme();
  const departments = useSelector((state) => state.departmentReducer.departments);

  useEffect(() => {
    if (sessionUser) {
      dispatch(departmentActions.fetchDepartments());
    }
  }, [dispatch, sessionUser]);

  return sessionUser && (
    <div className='left-navbar'>
      <div className='icon-user'>
        <Navigation />
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
  );
}

export default LeftNavBar;
