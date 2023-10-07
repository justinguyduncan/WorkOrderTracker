import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './Navigation.css';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';import ProfileButton from './ProfileButton';
import Icon from './work-order-management-1.png';


function Navigation({ isLoaded }){
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);
	const sessionUser = useSelector(state => state.session.user);





	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
	  };

	  const closeMenu = () => setShowMenu(false);

	return (
		<div className='navigation-container'>
			<h1><NavLink exact to="/dashboard"><img src={Icon} alt="Work Order Management" /></NavLink></h1>
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
			):(
				<ProfileButton/>
			)}
		</ul>
		</div>
	);
}

export default Navigation;
