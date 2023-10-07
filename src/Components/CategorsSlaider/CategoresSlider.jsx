import React from 'react'
import axios from 'axios';
import { useQuery } from 'react-query';
import Slider from 'react-slick';


export default function CategoresSlider() {
  var settings = {
    dots: false,
    autoplay:true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1
  };
  function getCategores()
{
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
}
let {isLoading,isError,data,refetch}=useQuery('categores',getCategores)


  return <>
  <Slider {...settings} className='mb-5'>
  {data?.data.data.map((image)=><div key={image.id}>
  <img  src={image.image} height={200} alt={image.name}/>
  <h4 className='h6'>{image.name}</h4>
  </div> )}
  </Slider>
  
  </>
}
