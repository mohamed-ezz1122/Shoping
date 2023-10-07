import axios from 'axios'
import {  useFormik } from 'formik'
import React, { createContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"

import { FallingLines } from  'react-loader-spinner'

export default function Register() {
  let navigate=useNavigate();
  let [error,setError]=useState(null);
  const [isloading, setisoLading] = useState(false)
async function submitRegister(values){
  setisoLading(true)
  let {data}=await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values).catch((err)=>{setError(err.response.data.message)
  setisoLading(false);
  })  
  if(data.message==="success")
  {
    setisoLading(false)
    navigate('/login')
  }
    
}

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

let validationSchema=Yup.object({
    name:Yup.string().min(3,"name minLength is 3").max(10,"name maxLength is 10").required("name is requierd"),
    phone:Yup.string().matches(phoneRegExp,"phone number is false").required("phone is required"),
    email:Yup.string().email("email is not true").required("email is required"),
    password:Yup.string().matches(/^[a-z0-9]{5,8}$/,"password is not true").required("password is required"),
    rePassword:Yup.string().oneOf([Yup.ref("password"),"repassword not matched password"]).required("rePassword is required"),
})

let formik=useFormik({

initialValues:{
    name:'',
    phone:'',
    email:'',
    password:'',
    rePassword:'',

},validationSchema,
onSubmit:submitRegister
})




  return <>
  <div className="container">
    <div className="mt-5 ">
    {error?<div className="alert alert-danger p-2">{error}</div>:''}
      
        <h2>Regester Now</h2>
        <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name :</label>
        <input onBlur={formik.handleBlur} value={formik.values.name} type="text" name='name' id='name' className='form-control ' onChange={formik.handleChange}  />
        
        {formik.errors.name&&formik.touched.name?<div className="alert alert-danger p-2 ">{formik.errors.name}</div>:""}
        <label htmlFor="phone">phone :</label>
        <input onBlur={formik.handleBlur} value={formik.values.phone} type="tel" name='phone' id='phone' className='form-control ' onChange={formik.handleChange}  />
        {formik.errors.phone&&formik.touched.phone?<div className="alert alert-danger p-2 ">{formik.errors.phone}</div>:""}
        <label htmlFor="email">email :</label>
        <input onBlur={formik.handleBlur} value={formik.values.email} type="email" name='email' id='email' className='form-control ' onChange={formik.handleChange}  />
        {formik.errors.email&&formik.touched.email?<div className="alert alert-danger p-2 ">{formik.errors.email}</div>:""}
        <label htmlFor="password">password :</label>
        <input onBlur={formik.handleBlur} value={formik.values.password} type="password" name='password' id='password' className='form-control ' onChange={formik.handleChange}  />
        {formik.errors.password&&formik.touched.password?<div className="alert alert-danger p-2 ">{formik.errors.password}</div>:""}
        <label htmlFor="rePassword">rePassword :</label>
        <input onBlur={formik.handleBlur} value={formik.values.rePassword} type="password" name='rePassword' id='rePassword' className='form-control ' onChange={formik.handleChange}  />
        {formik.errors.rePassword&&formik.touched.rePassword?<div className="alert alert-danger p-2 ">{formik.errors.rePassword}</div>:""}
        {isloading==false?<button disabled={!(formik.isValid&&formik.dirty)} className='btn btn-info text-white mt-2' type='submit'>Register</button>:<button  className='btn btn-info text-white mt-2' type='button'>
        <FallingLines
  color="#fff"
  width="20"
  visible={true}
  ariaLabel='falling-lines-loading'
/>
        </button>}
       
        



        </form>
    </div>
  </div>
  
  
  </>
}
