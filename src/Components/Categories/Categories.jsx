import React from 'react';
import styles from './Categories.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';

export default function Categories() {
  function getData()
  {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }
  let {isLoading,data}=useQuery('categoryData',getData);
  console.log();
  return <>
    {isLoading?''
    :<div className="row g-3">

{data?.data.data.map((product)=>
  <div key={product._id} className="col-md-4">
<div class="card product cursor-pointer" >
<img src={product.image} height={400} class="card-img-top " alt={product.name}/>
<div class="card-body">
  <h3 className='text-center text-main fw-bold h4'>
    {product.name}
  </h3>
</div>
</div>



  </div>)}




  </div>}
  </>
}
