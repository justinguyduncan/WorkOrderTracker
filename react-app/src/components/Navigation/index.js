import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './Navigation.css';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';import ProfileButton from './ProfileButton';
import LogoLight from '../../assets/logo-light.png';
import LogoDark from '../../assets/logo-dark.png';
import { useTheme } from '../../context/Theme';


function Navigation({ isLoaded }){
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);
	const sessionUser = useSelector(state => state.session.user);
	const { theme } = useTheme();





	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
	  };

	  const closeMenu = () => setShowMenu(false);

	return (
		<div className='navigation-container'>
			<h1><NavLink exact to="/dashboard"><img src={theme === 'dark' ? LogoLight : LogoDark} alt="Zumn" /></NavLink></h1>
		<ul>

			{isLoaded && !sessionUser ? (
				 <div>
				 <OpenModalButton
				 buttonText="Log In"
				 onItemClick={closeMenu}
				 modalComponent={<LoginFormModal />}
			   />

			   <OpenModalButton
				 buttonText="Sign Up"
				 onItemClick={closeMenu}
				 modalComponent={<SignupFormModal />}
			   />
			   </div>
			) : (
				<ProfileButton/>
			)}
		</ul>
		</div>
	);
}

export default Navigation;
