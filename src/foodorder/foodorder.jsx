

// import React, { useEffect, useState } from 'react';
// import ProfileHeader from '../sidenav/header';
// import Sidebar from '../sidenav/sidenavbar';
// import FoodOrderView from './foodorderview';
// import { useForm } from "react-hook-form"
// import { useDispatch } from 'react-redux';
// import { foodmenu } from '../allslice/menuSlice';


// const FoodOrder = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to control sidebar visibility

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen); // Toggle the sidebar visibility
//   };

//   const [foodname, setFoodName] = useState('')
//   const [category, setCategory] = useState('')
//   const [price, setPrice] = useState('')
//   const [fooditem, setfooditem] = useState([])

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   setfooditem([...fooditem, { fname: foodname, fcategory: category, fprice: price }])
//   //   setFoodName('')
//   //   setCategory('')
//   //   setPrice('')
//   // }

//   const { register, handleSubmit,reset, formState: { errors } } = useForm();
//   const dispatch = useDispatch();

//   const onSubmit = (data) =>
//   {
//    dispatch(foodmenu({
//     user_id: "81d7e7da-81ae-4d0b-8bf8-49764af11519",
// name: data.foodname,
// price: data.price,
// category: Number(data.category),
// image: ""

//    }));
//    console.log(data,"data")
//   };

//   useEffect(()=>
//   {
    

//   },[])

//   return (
//     <div className="app">
//       <ProfileHeader toggleSidebar={toggleSidebar} />
//       <div className="content">
//         <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
//         <div className={`main-content ${isSidebarOpen ? 'closed' : 'open'}`}>
//           <div className='card'>
//             <div className='card-body'>

//               <form onSubmit={handleSubmit(onSubmit)}>
//                 <div className='row'>
//                   <div className='col-lg-3 col-md-6 col-sm-6 col-12 mb-2'>
//                     <label className='fw-bold'>Food Name</label>
//                     <input type="text" name="foodname" {...register("foodname")} style={{ width: "100%", height: "35px", borderRadius: "8px" }} />
//                   </div>
//                   <div className='col-lg-3 col-md-6 col-sm-6 col-12 mb-2'>
//                     <label className='fw-bold'>Category</label>
//                     {/* <input type="text" style={{width:"100%"}}/> */}
//                     <div>
//                       <select {...register("category")} name='category' style={{ width: "100%", height: "35px", borderRadius: "8px" }}>
//                         <option value='Select Category'>Select Category</option>
//                         <option value='0'>Veg</option>
//                         <option value='1'>Non-veg</option>

//                       </select>
//                     </div>

//                   </div>
//                   <div className='col-lg-3 col-md-6 col-sm-6 col-12 mb-2'>
//                     <label className='fw-bold'>Price</label>
//                     <input type="text" name='price' {...register("price")} style={{ width: "100%", height: "35px", borderRadius: "8px" }} />
//                   </div>
//                   <div className='col-lg-3 col-md-6 col-sm-6 col-12 mb-2'>
//                     <label className='fw-bold'>Food Image</label>
//                     <input type="file" {...register("foodimage")} name='foodimage' style={{ width: "100%", height: "35px", borderRadius: "8px" }} />
//                   </div>
//                 </div>
//                 <div className='d-flex align-items-center justify-content-center mt-4'>
//                   <button className='fw-bold' style={{ background: "#410445", border: "#410445", color: "white", borderRadius: "8px", padding: "6px 12px" }}>Submit</button>
//                 </div>
//               </form>

//             </div>
//           </div>

//           <FoodOrderView fooditem={fooditem} setfooditem={setfooditem} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FoodOrder;



import React, { useState, useEffect } from 'react';
import ProfileHeader from '../sidenav/header';
import Sidebar from '../sidenav/sidenavbar';
import FoodOrderView from './foodorderview';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { foodmenu, getfoodmenu } from '../allslice/menuSlice';
import { useLocation } from 'react-router-dom';

const FoodOrder = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to control sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle the sidebar visibility
  };

  const { register, handleSubmit,reset, formState: { errors } } = useForm();
  const dispatch = useDispatch();

  const [fooditem, setfooditem] = useState([])
  const [loading, setloading] = useState(false)

  const onSubmit = (data) => {
    // Create FormData object to handle file uploads
    const userid = localStorage.getItem('userid'); 
    const formData = new FormData();    
    
    // Append the form fields to FormData
    formData.append("user_id", userid);
    formData.append("name", data.foodname);
    formData.append("price", Number(data.price));
    formData.append("category", Number(data.category));
    
    // If an image is selected, append it to FormData
    if (data.foodimage && data.foodimage[0]) {
      formData.append("image", data.foodimage[0]);
    } else {
      formData.append("image", "");  // If no image, append an empty string
    }
  
    // Log form data for debugging
    console.log("Form Data being dispatched:", formData);
  
    // Dispatch the action to the store
    dispatch(foodmenu(formData));  // Dispatch the FormData to the Redux action
  };
  


  const foodOrderView = useSelector((state) => state.menu);
  console.log("foodOrderView",foodOrderView?.getdata?.status)

  const getFoodDetails = () =>
  {
     const userid = localStorage.getItem('userid'); 
     
      const payload = {
        user_id: userid,
      }
     dispatch(getfoodmenu(payload))
     setloading(true) 
    }

    useEffect(()=>
      {
        
        getFoodDetails()
      },[])



    useEffect(()=>
      {
       
  if(foodOrderView.data.status === 'success')
  {
    getFoodDetails()
    
  }
      },[foodOrderView.data])

    useEffect(()=>
    {
       
    
      
if(foodOrderView?.getdata?.status === 'success')
{
  setfooditem(foodOrderView?.getdata)
    setloading(false) 
    reset()
}
    },[foodOrderView.getdata])


    
  return (
    <div className="app">
      <ProfileHeader toggleSidebar={toggleSidebar} />
      <div className="content">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`main-content ${isSidebarOpen ? 'closed' : 'open'}`}>
          <div className='card'>
            <div className='card-body'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='row'>
                  <div className='col-lg-3 col-md-6 col-sm-6 col-12 mb-2'>
                    <label className='fw-bold'>Food Name</label>
                    <input
                      type="text"
                      name="foodname"
                      {...register("foodname", {required:"Food Name is required."})}
                      style={{ width: "100%", height: "35px", borderRadius: "8px" }}
                    />
                      {errors.foodname && <span style={{ color: "red" }}>{errors.foodname.message}</span>}

                  </div>
                  <div className='col-lg-3 col-md-6 col-sm-6 col-12 mb-2'>
                    <label className='fw-bold'>Category</label>
                    <select
                      {...register("category", {
                        validate: value => value !== "Select Category" || "Category is required.",
                      })}
                      name="category"
                      style={{ width: "100%",cursor:"pointer", height: "35px", borderRadius: "8px" }}
                    >
                      <option value="Select Category" style={{cursor:"pointer"}}>Select Category</option>
                      <option value="1" style={{cursor:"pointer"}}>Veg</option>
                      <option value="2" style={{cursor:"pointer"}}>Non-veg</option>
                    </select>
                    {errors.category && <span style={{ color: "red" }}>{errors.category.message}</span>}

                  </div>
                  <div className='col-lg-3 col-md-6 col-sm-6 col-12 mb-2'>
                    <label className='fw-bold'>Price</label>
                    <input
                      type="text"
                      name="price"
                      {...register("price", {required:"Price is required."})}
                      style={{ width: "100%", height: "35px", borderRadius: "8px" }}
                    />
                                          {errors.price && <span style={{ color: "red" }}>{errors.price.message}</span>}

                  </div>
                  <div className='col-lg-3 col-md-6 col-sm-6 col-12 mb-2'>
                    <label className='fw-bold'>Food Image</label>
                    <input
                      type="file"
                      {...register("foodimage", {required:"Food Image is required."})}
                      name="foodimage"
                      style={{ width: "100%", height: "35px", borderRadius: "8px" }}
                    />
                                          {errors.foodimage && <span style={{ color: "red" }}>{errors.foodimage.message}</span>}

                  </div>
                </div>
                <div className='d-flex align-items-center justify-content-center mt-4'>
                  <button
                    className='fw-bold'
                    style={{
                      background: "#410445",
                      border: "#410445",
                      color: "white",
                      borderRadius: "8px",
                      padding: "6px 12px"
                    }}
                  >
                    Submit
                  </button>

                </div>
              </form>
         
            </div>
          </div>

          {/* FoodOrderView component */}
          <FoodOrderView fooditem={fooditem} setfooditem={setfooditem} loading={loading}/>
        

        </div>
      </div>
    </div>
  );
}

export default FoodOrder;
