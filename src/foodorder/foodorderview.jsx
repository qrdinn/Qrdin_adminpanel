

import React, { useEffect, useState } from 'react';


const FoodOrderView = ({fooditem,setfooditem,loading}) =>{
 
  console.log(fooditem,"fooditem")
  console.log(loading,"loading")


  const handleEditCategory = (oldfooditem) => {
    const newCategory = prompt("Edit Category:", oldfooditem);
    if (newCategory && newCategory !== oldfooditem) {
      setfooditem(
        fooditem.map((item) =>
          item === oldfooditem ? newCategory : item
        )
      );
    }
  };

  const handleDeleteCategory = (category) => {
    
    setfooditem(fooditem.filter((item) => item !== category));
  };




  return (
   
        <>
        {loading && (
          <div className='d-flex align-items-center justify-content-center' style={{height:"100%",}}>
          <div className='loader' >
          </div>
</div>
        )}

<div className='d-flex align-items-center justify-content-center pt-5'>
  <h4 className='fw-bold' style={{color:"#410445"}}>Food Details</h4>
</div>

          <div className='row py-3'>
{fooditem?.data?.map((item,index)=>(


            <div className='col-lg-3 col-md-6 col-sm-6 col-12 mb-3' key={index}>
              <div className='card' style={{background:"#f9dc83", border:"none", boxShadow:"0px 0px 8px 0px black"}}>
                <div className='card-body' style={{textAlign:"center"}}>
  <img src={item.image_data} style={{width:"120px",height:"120px", borderRadius:"50%",border:"1px solid white"}} className='mb-2' /><br></br>
<span className='fw-bold'>{item.name}</span><br></br>
<span className='fw-bold'>{item.category == 1 ? 'Veg' : 'Non-veg'}</span><br></br>
<span className='fw-bold'>{item.price}</span>

                </div>
             
              </div>
            </div>
            ))}
       
          </div>
          </>
  );
}

export default FoodOrderView;
