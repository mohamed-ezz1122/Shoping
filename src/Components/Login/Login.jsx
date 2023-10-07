import axios from 'axios'
import {  useFormik } from 'formik'
import React, { createContext, useContext } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import { FallingLines } from  'react-loader-spinner'
import { UserContext } from '../../Context/UserContext'

export default function Login() {
let {setUserToken,setUserProfile}=useContext(UserContext)
  let navigate=useNavigate();
  let [error,setError]=useState(null);
  const [isloading, setisoLading] = useState(false)
async function submitLogin(values){
  setisoLading(true)
  let {data}=await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values).catch((err)=>{setError(err.response.data.message)
  setisoLading(false);
  })  
  if(data?.message==="success")
  {
    // console.log(data.token);
    localStorage.setItem('userToken',data?.token)
    setUserToken(data?.token)
    setUserProfile(data?.user)
    setisoLading(false)
    navigate('/')
  }
    
}


let validationSchema=Yup.object({
    email:Yup.string().email("email is not true").required("email is required"),
    password:Yup.string().matches(/^[a-z0-9]{5,8}$/,"password is not true").required("password is required"),
})

let formik=useFormik({

initialValues:{
    name:'',
    phone:'',
    email:'',
    password:'',
    rePassword:'',

},validationSchema,
onSubmit:submitLogin
})




  return <>
  <div className="container">
    <div className="mt-5 ">
    {error?<div className="alert alert-danger p-2">{error}</div>:''}
      
        <h2>Login Now</h2>
        <form onSubmit={formik.handleSubmit}>
        
        
        <label htmlFor="email">email :</label>
        <input onBlur={formik.handleBlur} value={formik.values.email} type="email" name='email' id='email' className='form-control ' onChange={formik.handleChange}  />
        {formik.errors.email&&formik.touched.email?<div className="alert alert-danger p-2 ">{formik.errors.email}</div>:""}
        <label htmlFor="password">password :</label>
        <input onBlur={formik.handleBlur} value={formik.values.password} type="password" name='password' id='password' className='form-control ' onChange={formik.handleChange}  />
        {formik.errors.password&&formik.touched.password?<div className="alert alert-danger p-2 ">{formik.errors.password}</div>:""}
        
        {isloading==false?<button disabled={!(formik.isValid&&formik.dirty)} className='btn btn-info text-white mt-2' type='submit'>Login</button> :<button  className='btn btn-info text-white mt-2' type='button'>
        <FallingLines
  color="white"
  width="20"
  visible={true}
  ariaLabel='falling-lines-loading'
/>
        </button>}
       
        



        </form>
    </div>
  <Link to={"/forgetPasseord"} className='mt-5 fw-bold'>
  forget your password ?
  </Link>
  </div>

  
  
  </>
}
