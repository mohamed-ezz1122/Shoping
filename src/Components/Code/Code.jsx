import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import * as Yup from "yup"
import { PasswordContext } from '../../Context/PasswordContext';

export default function Code() {
    const [dataForPassword, setDataForPassword] = useState(null)
    let {sendCode}=useContext(PasswordContext)
  async function getCode(values)
  {
    let {data}= await sendCode(values)
      // console.log(values);
      console.log(data);
      setDataForPassword(data)
  }
  
  
  let formik=useFormik({
      initialValues:{
        resetCode:''
      },
      onSubmit:getCode
  })
  return <>
  <div>
    
  <form onSubmit={formik.handleSubmit} >
  
   <input onBlur={formik.handleBlur} value={formik.values.resetCode} type="number" name='resetCode' id='resetCode' className='form-control p-3' onChange={formik.handleChange} placeholder='code' />
        
        <button type='submit' className='btn btn-outline-success mt-4'>Verify</button>
  </form>
  </div>
  </>
}
