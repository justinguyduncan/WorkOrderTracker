import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import CreateEditDepartment from "../departmentmanagement/createdepartment";
import "./ProfileButton.css";

function AccountModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const user = useSelector(state => state.session.user);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    closeModal();
  };

  if (!user) return null;

  const initials = user.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?';

  return (
    <div className="account-modal">
      <div className="account-modal-header">
        <div className="account-avatar-lg">{initials}</div>
        <div>
          <p className="account-name">{user.name}</p>
          <p className="account-email">{user.email}</p>
        </div>
      </div>
      <div className="account-modal-divider" />
      <div className="account-modal-actions">
        <OpenModalButton
          modalComponent={<CreateEditDepartment />}
          buttonText="Create Department"
          className="account-action-btn"
        />
        <button className="account-logout-btn" onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
}

function ProfileButton() {
  const user = useSelector(state => state.session.user);
  const { setModalContent } = useModal();

  if (!user) return null;

  const openAccount = () => setModalContent(<AccountModal />);

  return (
    <span className="profile-name-btn" onClick={openAccount}>
      {user.short_name}
    </span>
  );
}

export default ProfileButton;
