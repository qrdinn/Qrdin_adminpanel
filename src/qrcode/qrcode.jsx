


import React, { useEffect, useState } from 'react';
import ProfileHeader from '../sidenav/header';
import Sidebar from '../sidenav/sidenavbar';
import food from '../images/foodimg.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { get_qrcode } from '../allslice/qrSlice';


const QrCode = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to control sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle the sidebar visibility
  };

const qrCodeView = useSelector((state) => state.qrcode)
const [qrimage, setQrimage] = useState([])
const [loading, setloading] = useState([])


console.log(qrCodeView.data.status,"qrCodeView")

  const dispatch = useDispatch();

  useEffect(()=>
  {
    const userid = localStorage.getItem('userid'); 
  const payload = {
     "user_id": userid,
  }
  dispatch(get_qrcode(payload))
  setloading(true)
  },[])

  useEffect(()=>
      {
        
  if(qrCodeView.data.status === 'success')
  {
    setQrimage(qrCodeView?.data?.qr_codes)
    setloading(false)

  }
      },[qrCodeView.data])


  return (
    <div className="app">
      <ProfileHeader toggleSidebar={toggleSidebar} />
      <div className="content">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`main-content ${isSidebarOpen ? 'closed' : 'open'}`}>
        {loading && (
          <div className='d-flex align-items-center justify-content-center' style={{height:"100%",}}>
          <div className='loader' >
          </div>
</div>
        )}
        <div className="row px-1 d-flex align-items-center justify-content-center">
        
  {qrimage?.map((items,index) => (
 <>
 <div  className='col-lg-2 col-md-3 col-sm-4 col-6 card mb-3 mx-2'  style={{textAlign:"center"}}>
   <div key={index}>
 <img
   src={items.image}
   alt="QR Code"
   style={{ width: '100%', height: 'auto', marginBottom: '5px' }}
 />
 <br />
 <a
   href={items.image}
   download="qrcode.png"
   className='mb-3'
   style={{
     fontWeight:"bold",
     display: 'inline-block',
     padding: '5px 10px',
     backgroundColor: '#410445',
     color: 'white',
     textDecoration: 'none',
     borderRadius: '5px'
   }}
 >
   Download
 </a>
 </div>
 </div>&nbsp;&nbsp;
</>
  )) }
 
 
  
  
</div>

       </div>
      </div>
    </div>
  );
}

export default QrCode;
