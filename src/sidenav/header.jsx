import React, { useState } from 'react';
import { IoIosMenu } from 'react-icons/io'; // Import hamburger icon
import { CgProfile } from "react-icons/cg";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const ProfileHeader = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navigate = useNavigate();

  const username = localStorage.getItem('usernames')

  const handleLogout = () =>
  {
    localStorage.removeItem('userid');
    localStorage.removeItem('tokens')
    localStorage.removeItem('usernames')
    navigate('/');
  }

  return (
    <div style={{position:"sticky", top:"0px",zIndex:"11"}}>
    <header className="profile-header">
      <div className="hamburger" onClick={toggleSidebar}>
        <IoIosMenu style={{ fontSize: '30px', color: 'white' }} />
      </div>
      <div className="profile-info">
        <h3>{username}</h3>
      </div>
      <nav className="header-nav">
        {/* Profile Icon */}
        <CgProfile fontSize="50px" />

        {/* Toggle Dropdown on click */}
        <div onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
          {isDropdownOpen ? (
            <IoMdArrowDropup style={{ fontSize: '20px', color: 'white' }} />
          ) : (
            <IoMdArrowDropdown style={{ fontSize: '20px', color: 'white' }} />
          )}
        </div>
     
        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div style={{position:"relative"}} >
          <span onClick={handleLogout} style={{position:"absolute", cursor:"pointer", top:"30px", right:"0px" , background:"white", color:"black", border:"1px solid white", borderRadius:"8px",fontWeight:"bold", padding:"3px 10px", boxShadow:"0px 0px 8px 0px black"}}>Logout</span>

          </div>
        )} 
      </nav>
    </header>
    </div>
  );
}

export default ProfileHeader;

