import axios from 'axios';
import React, { useContext } from 'react'
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import Slider from 'react-slick';
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {
  let {addToCart}=useContext(cartContext)
  async function addProducts(id)
{
  let respons= await addToCart(id)
  // console.log(respons.data.status);
  if(respons.data.status==="success"){
    toast.success('Add success');
  }
  else
  {
    toast.error('Something Rong try agin');
  }
}
    var settings = {
        dots: false,
        autoplay:true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
    let params=useParams();
    function getProductDetails(id)
    {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
    let {isLoading,isError,data,isFetched}=useQuery('productDetails',()=>getProductDetails(params.id))
    
  return <>
    {data?.data.data?<div className="row align-items-center">
    <Helmet>
                <meta charSet="utf-8" />
                <title>{data?.data.data.title}</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>

<div className="col-md-4">


<Slider {...settings}>
      {data?.data.data.images.map((image)=>
      <div>
      <img src={image}  className='image'  alt={data?.data.data.title}/>
      <h4>{data?.data.data.title}</h4>
      </div> )}
    </Slider>
    </div>
<div className="col-md-8">
    <h5>{data?.data.data.title}</h5>
    <h6 className='mt-4'>{data?.data.data.description}</h6>
    <p>
    {data?.data.data.category.name}
    </p>
    <div className="d-flex align-items-center justify-content-between">
        <span className='fw-bold'>{data?.data.data.price} EGP</span>
        <span className='fw-bold'>
        <i class="fa-solid fa-star rating-color"></i>
        {data?.data.data.ratingsAverage}
        </span>
    </div>
    <button onClick={()=>addProducts(data?.data.data.id)}  className='btn bg-main w-100 text-white mt-3'>Add To Card</button>


</div>


    </div>:''}
  
  
  
  </>
}
