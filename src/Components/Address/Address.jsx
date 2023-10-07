import { useFormik } from 'formik'
import React, { useContext } from 'react'
import * as Yup from "yup"
import { cartContext } from '../../Context/CartContext';
export default function Address() {


let {chickOutSession,cardId}=useContext(cartContext)



async function payNow(values)
{
    let {data}=await chickOutSession(cardId,values)
    
    window.location.href=data?.session.url
   
}
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

let validationSchema=Yup.object({
phone:Yup.string().matches(phoneRegExp,"phone number is false").required("phone is required"),
})

  
let formik=useFormik({
    initialValues:{
        details:'',
        phone:'',
        city:'',
    },validationSchema,
    onSubmit:payNow
})



  return <>
  
  <form onSubmit={formik.handleSubmit}>
        
        
        <label htmlFor="details">details :</label>
        <input onBlur={formik.handleBlur} value={formik.values.details} type="text" name='details' id='details' className='form-control ' onChange={formik.handleChange}  />
        {/* {formik.errors.email&&formik.touched.email?<div className="alert alert-danger p-2 ">{formik.errors.email}</div>:""} */}
        <label htmlFor="phone">phone :</label>
        <input onBlur={formik.handleBlur} value={formik.values.phone} type="phone" name='phone' id='phone' className='form-control ' onChange={formik.handleChange}  />
        
        {formik.errors.phone&&formik.touched.phone?<div className="alert alert-danger p-2 ">{formik.errors.phone}</div>:""}
        <label htmlFor="city">city :</label>
        <input onBlur={formik.handleBlur} value={formik.values.city} type="text" name='city' id='city' className='form-control ' onChange={formik.handleChange}  />
        <button  className='btn btn-info text-white mt-2' type='submit'>Pay Now</button> 
        



        </form>
  
  </>
}
