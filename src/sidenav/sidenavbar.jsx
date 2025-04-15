

import React from 'react';
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div style={{position:"relative",zIndex:"11"}} className={`sidebar-wrapper ${isOpen ? 'open' : 'closed'}`}>
      <nav className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div  onClick={toggleSidebar} className='d-none d-sm-none d-md-none d-lg-block'>
          {isOpen ? (
            <div style={{position:"absolute", left:"210px"}}>
            <IoIosArrowDropleftCircle style={{ color: 'white', fontSize: '25px', cursor:"pointer" }} />
            </div>
          ) : (
            <div style={{position:"absolute", left:"215px"}}>
            <IoIosArrowDroprightCircle style={{ color: '#410445', fontSize: '25px', cursor:"pointer" }} />
            </div>
          )}
        </div>
        <ul>
        
          <li><a style={{fontWeight:"bold"}} href="/food-items">Food Items</a></li>
          <li><a  style={{fontWeight:"bold"}} href="/table">Table</a></li>
          <li><a  style={{fontWeight:"bold"}} href="/qr-code">QR Code</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
