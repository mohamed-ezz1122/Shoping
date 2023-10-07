import { hasFormSubmit } from '@testing-library/user-event/dist/utils';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import * as Yup from "yup"
import { UserContext } from '../../Context/UserContext';
import { PasswordContext } from '../../Context/PasswordContext';
import Code from '../Code/Code';


export default function ForgetPassword() {
  const [dataForPassword, setDataForPassword] = useState(null)
  let {forgetPasseord}=useContext(PasswordContext)
async function getPasseord(values)
{
  let {data}=await forgetPasseord(values)
    console.log(data);
    console.log(values);
    setDataForPassword(data)
}
let validationSchema=Yup.object({
    email:Yup.string().email("email is not true").required("email is required")  
 })

let formik=useFormik({
    initialValues:{
        email:''
    },validationSchema,
    onSubmit:getPasseord
})






  return <>
  <h2>please enter your verification code</h2>
  {dataForPassword?.statusMsg==="success"?<Code/>:<div>
    
    <form onSubmit={formik.handleSubmit} >
    
     <input onBlur={formik.handleBlur} value={formik.values.email} type="email" name='email' id='email' className='form-control p-3' onChange={formik.handleChange} placeholder='email' />
          {formik.errors.email&&formik.touched.email?<div className="alert alert-danger p-2 ">{formik.errors.email}</div>:""}  
          <button type='submit' className='btn btn-outline-success mt-4'>Verify</button>
    </form>
    </div>}
  
  
    </>
}
