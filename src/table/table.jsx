


import React, { useEffect, useState, useRef } from 'react';
import ProfileHeader from '../sidenav/header';
import Sidebar from '../sidenav/sidenavbar';
import food from '../images/foodimg.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { get_table, order_complete } from '../allslice/tableSlice';


const Table = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to control sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle the sidebar visibility
  };

  const dispatch = useDispatch();

  const [tableorder, setTableOrder] = useState([])
  const [loading, setloading] = useState(false)

  const tableView = useSelector((state) => state.table)

  console.log(tableorder,"tableView")

  const gettable = () => 
  {
    const userid = localStorage.getItem('userid'); 
  const payload = {
     "user_id": userid,
  }
  dispatch(get_table(payload))
  setloading(true)
  }

  
 

  useEffect(()=>
  {
  if(tableView.data.status === 'success')
  {
    setTableOrder(tableView?.data?.data)
    setloading(false)
  }
  },[tableView.data])

  const handleServed = (order_id) =>
    {
      const userid = localStorage.getItem('userid'); 
  
      const payload = {
  user_id : userid,
  orderid: order_id
      }
      dispatch(order_complete(payload))
    }

    useEffect(()=>
    {
      if(tableView.orderdata.status === 'success')
      {
        gettable()
      }
    },[tableView.orderdata])

    const handleComplete = (tableid) =>
    {
      const userid = localStorage.getItem('userid'); 
  
      const payload = {
  user_id : userid,
  table_id: tableid
      }
      dispatch(order_complete(payload))
    }

    const [istoggleButton, setIsToggleButton] = useState(false);

 
//   const handleOnClick = async (status) => {
//     setIsToggleButton(true)
//  if(status === true)
//  {
 
//     try {
//       const response = await fetch('https://karthi9150.pythonanywhere.com/getstatus');
//       const data = await response.json();
//     if(data.status === true)
//     {
//       gettable()
//     }
    
//     } catch (error) {
//       console.error('Error fetching status:', error);
//     } 
//   }
//   else{
//     setIsToggleButton(false)
//   }

// }

const intervalRef = useRef(null);

const handleOnClick = async (status) => {
  

  if (status === true) {
    setIsToggleButton(true);
    // Clear any existing interval to avoid duplicates
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Call immediately once
    checkStatus();

    // Then call every minute
    intervalRef.current = setInterval(() => {
      checkStatus();
    }, 30000); // 60000ms = 1 minute
  }
  else{
    setIsToggleButton(false);
    gettable();
  }
};

const checkStatus = async () => {
  try {
    const response = await fetch('https://karthi9150.pythonanywhere.com/getstatus');
    const data = await response.json();
    if (data.status === true) {
      gettable();
    }
  } catch (error) {
    console.error('Error fetching status:', error);
  }
};

// Optional cleanup
useEffect(() => {
  return () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
}, []);

useEffect(()=>
{
  handleOnClick()
},[])
 
  return (
<>
   

    <div className="app">
      <ProfileHeader toggleSidebar={toggleSidebar} />
      <div className="content">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`main-content ${isSidebarOpen ? 'closed' : 'open'}`}>
        <div className='d-flex align-items-between justify-content-between'>
          <div>
              <h4>Food Order Items</h4>
              </div>
              {/* <div>
      <button style={{ backgroundColor: istoggleButton ? 'green' : 'gray',border:"none", fontWeight:"bold", color: "white" }}>
        ON
      </button>
      <button style={{ backgroundColor: !istoggleButton ? 'red' : 'gray',border:"none" , fontWeight:"bold" , color: "white" }}>
        OFF
      </button>
    </div> */}

<div>
      <button
        onClick={()=>handleOnClick(true)}
        style={{
          backgroundColor: istoggleButton ? 'green' : 'gray',
          border: "none",
          fontWeight: "bold",
          color: "white"
        }}
      >
        ON
      </button>
      <button
        onClick={()=>handleOnClick(false)}
        style={{
          backgroundColor: !istoggleButton ? 'red' : 'gray',
          border: "none",
          fontWeight: "bold",
          color: "white"
        }}
      >
        OFF
      </button>
    </div>
            </div>
            {loading && (
      <div className='d-flex align-items-center justify-content-center' style={{height:"100%",}}>
      <div className='loader' >
      </div>
</div>
    )}

<div  className="mt-3 mb-3">
{tableorder?.map((item, index) => (
  <div key={index} className="mt-3 mb-3">
    <div className="d-flex align-items-between justify-content-between">
      <div>
        <h5>Table {item.table_id}</h5>
      </div>
      <div>
        {/* <button style={{ background: "blue", border: "none", color: "white", borderRadius: "6px", fontWeight: "600" }}>
          Print Order
        </button>
        &nbsp;&nbsp;&nbsp; */}
        <button onClick={()=> handleComplete(item.table_id)} style={{ background: "green", border: "none", color: "white", borderRadius: "6px", fontWeight: "600" }}>
          Complete Order
        </button>
      </div>
    </div>

    <table className="styled-table mt-2">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          {/* <th>Description</th> */}
          <th>Category</th>
          <th>Price</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {item?.order_list?.map((order, i) => (
          <tr key={i}>
            <td><img src={order.image_data} style={{ width: "50px",height:"50px", borderRadius:"50%" }} alt="food" /></td>
            <td>{order.food_name}</td>
            {/* <td>{order.description}</td> */}
            <td>{order.category === 1 ? "Veg" : "Non-veg"}</td>
            <td>{order.food_price}</td>
            <td>
              <button style={{cursor:"default", background: order.order_status == 1 ? "orange" : "red", border: "none", color: "white", borderRadius: "6px", fontWeight: "600" }}>
                {/* {order.status} */}
                {order.order_status == 1 ? "Pending" : "Completed"}
              </button>
            </td>
            <td>
              <button onClick={()=>handleServed(order.orderid)} style={{ background: "#56065c", border: "none", color: "white", borderRadius: "6px", fontWeight: "600" }}>
                Served
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
))}
</div>
        
       </div>
      </div>
    </div>
    </>
  );
}

export default Table;
