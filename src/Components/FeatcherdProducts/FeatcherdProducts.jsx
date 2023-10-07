import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { FallingLines } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast';
export default function FeatcherdProducts() {
let {addToCart,setCartCount}=useContext(cartContext)
 async function addProducts(id)
{
  let respons= await addToCart(id)
  // console.log(respons.data.status);
  if(respons.data.status==="success"){
    toast.success('Add success');
    setCartCount(respons.data)
  }
  else
  {
    toast.error('Something Rong try agin');
  }
}

function getAllProducts(){
  return axios.get('https://ecommerce.routemisr.com/api/v1/products')
}
let {isLoading,isFetched,data,refetch}=useQuery("FeatcherdProducts",getAllProducts)

// const [productes, setProductes] = useState([])
//    async function getAllProducts()
//     {
//         let {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/products')
       
       
//         console.log(data.data);
//         setProductes(data.data)
//     }   
//    useEffect(() => {
//         getAllProducts()
//     }, [])
    
//     console.log(productes);




  return <>
    <h2 className='h4'>Shop Popular Categores</h2>
  <input type="text" className='form-control w-50 mx-auto  my-5' placeholder='Search ...'/>
  {isLoading?<div className="w-100 vh-100 d-flex align-items-center justify-content-center ">
<FallingLines
  color="green"
  width="100"
  visible={true}
  ariaLabel='falling-lines-loading'
/>
</div>: <div className="row">
  
    
    {data?.data.data.map((product)=>
        (
          
          
          
          <div key={product.id} className="col-md-3 p-3">
            <div className="inner product p-2 d-flex flex-column justify-content-center">
            <Link to={`/productDetails/${product.id}` }>

                <img src={product.imageCover} className='w-100' alt={product.title} />
                <h4 className='h6 text-main'>{product.category.name}</h4>
                <h3 className='h5 fw-bold '>{product.title.split(' ',2).join(' ')}</h3>
                <div className="d-flex align-items- center justify-content-between ">
                  <span>{product.price}EGP</span>
                  <span><i class="fa-solid fa-star rating-color"></i>{product.ratingsAverage}</span>
                  
                </div>
            </Link>
                <button onClick={()=>addProducts(product.id)} className='btn bg-main w-50 mx-auto text-white'>ADD TO CART</button>
            </div>
            </div>
         
        )      
    
    
    
    
    )}
    




  </div>

  }



 
  
  </>
}
