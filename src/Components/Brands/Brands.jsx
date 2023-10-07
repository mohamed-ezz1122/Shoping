import React from 'react';
import styles from './Brands.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import swal from 'sweetalert';

export default function Brands() {

  function getBrands()
  {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  }
  let {isLoading ,data}=useQuery('dataOfBrands',getBrands)
  
   function showAlart(e)
  {
   
    swal({
      
      
      text: `${data?.data.data[e.target.parentElement.dataset.index].name}`,
      button: "close",
    }) ;

    
  }


  
  return <>
    
    {isLoading?""
    :<div className='row g-3'>
      
      <h2 className='fw-bold mx-auto my-5 text-main'>All Brands</h2>
{data?.data.data.map((brand,index)=><div key={brand._id} className="col-md-3">
<div onClick={(e)=>showAlart(e)} data-index={index} class="card product cursor-pointer" >
<img src={brand.image}  class="card-img-top " alt={brand.name}/>
<div class="card-body">
  <h4 className='text-center  h5'>
    {brand.name}
  </h4>
  
  
</div>



      </div>
      </div>)}
      
      
      
      
      </div>}
  </>
}
