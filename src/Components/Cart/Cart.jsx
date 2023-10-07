import React, { useContext, useEffect, useState } from 'react';
import styles from './Cart.module.css';
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { FallingLines } from 'react-loader-spinner'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import emptyCart from '../../Assets/images/emptyCart.jpg'
export default function Cart() {
const [cartDetails, setCartDetails] = useState([])
const [data, setData] = useState(null)

let {GetLoggedUserCart,deletProduct,updateCount,clarCart,setCartCount,cartCount} =useContext(cartContext)
let navigat=useNavigate()

async function emptyCard()
{
  let {data}=await clarCart()
  
  if(data?.message==='success')
  {
    setCartCount(0)
    
    
  }
}

async function editCont(id,count) {
  let {data}=await updateCount(id,count)
  setCartDetails(data?.data)
}

async function getCart()
{
  let {data} =await GetLoggedUserCart()
  
  
  setCartDetails(data?.data)
  
  setData(data)
  
}


async function removeProduct(id){
  let {data}=await deletProduct(id)
  setCartDetails(data?.data)
  if(data?.status==='success')
  {
    toast.success('Deleted Success');
  }
  else
  {
    toast.success('Something Rong try agin');

  }
}



useEffect(()=>{
  getCart()
},[])

  return <>
  {data?.numOfCartItems ===0||cartCount===0?
  
  
  <div className=' vh-100 text-center'>
    
    <h3>empty Cart</h3>
    <img src={emptyCart} className=" w-75" alt="empty Cart" />
  </div>
  
  :<div>
   {cartDetails?.products?<div className="bg-body-tertiary  p-3 mt-2">
  <div className="d-flex justify-content-between align-items-center">
<div className="">
<h2>Shope Cart: </h2>
<h4 className='text-main h6 fw-bolder'>Total Cart Price : {cartDetails.totalCartPrice} EGP</h4>
</div>
<Link to={'/address'} className='btn bg-info text-white w-25 m-3'>Pay Now</Link>
  </div>


{cartDetails?.products?.map((product)=><div key={product._id} className="row border-bottom align-items-center">
<div className="col-md-2">
  <img src={product.product.imageCover} className='w-100 p-3' alt=" " />

</div>
<div className="col-md-10">
  <div className="d-flex align-items-center justify-content-between">
<div className="">
  <h2>{product.product.title.split(" ",3)}</h2>
  <h3 className='text-main h5 fw-bold'>price : {product.price} EGP</h3>
  <span onClick={()=>removeProduct(product.product.id)} className='cursor-pointer my-2'><i class="fa-solid fa-trash text-danger me-2"></i>Remove</span>
</div>
<div className='p-3'>
  <span onClick={()=>editCont(product.product.id,product.count+1)} className='border cursor-pointer rounded py-1 px-2 border-main'>+</span>
  <span className='mx-2'>{product.count}</span>
  <span onClick={()=>editCont(product.product.id,product.count-1)} className='border-main cursor-pointer border rounded py-1 px-2'>-</span>
</div>
  </div>
</div>


</div>)}

<Link to={'/'} onClick={emptyCard} className='btn btn-outline-success fit-content mx-auto w-25 m-3'> Clar Card</Link>

</div>:<div className='vh-100 d-flex align-items-center justify-content-center'>
<FallingLines
color="green"
width="100"
visible={true}
ariaLabel='falling-lines-loading'
/>
  
  </div>}
</div>}
  
   

    
  </>
}
