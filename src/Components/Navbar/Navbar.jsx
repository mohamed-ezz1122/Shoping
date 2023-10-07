import React, { useContext, useEffect, useState } from 'react';
import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/images/freshcart-logo.svg'
import { UserContext } from '../../Context/UserContext';
import { cartContext } from '../../Context/CartContext';

export default function Navbar() {

  let {userToken,setUserToken}=useContext(UserContext)
  let {GetLoggedUserCart,cartCount}=useContext(cartContext)
 


  let navigate=useNavigate()
  function logOut(){
    localStorage.removeItem('userToken')
    setUserToken(null)
    navigate('/login')
  }
  return <>
    <nav className="navbar fixed-top navbar-expand-lg  bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo}  alt="fresh cart logo" />
        </Link>
        
              <Link className="nav-link" to="/profile"><i class="fa-solid fa-user "></i></Link>
            
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            {userToken!==null?
            <>
           
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/categories">Categories</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/brands">Brands</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Cart">Cart</Link>
            </li>
            
            </>:''}
            

          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            
            {userToken !== null?<div className='d-flex justify-content-center align-items-center cursor-pointer'>
              <li className="nav-item position-relative ">
              <Link to={"/Cart"}>
              <div className='position-absolute   badge bg-main rounded-circle mb-5'>{cartCount?.numOfCartItems}</div>
              <i class="fa-solid fa-cart-shopping fa-xl "></i>
              </Link>
</li>
<li className="nav-item">
  
  <span className="nav-link cursor-pointer" onClick={logOut} >Logout</span>
</li>
            </div>
           : <>
            <li className="nav-item d-flex align-items-center">
              <i className='fab mx-2 fa-facebook'></i>
              <i className='fab mx-2 fa-twitter'></i>
              <i className='fab mx-2 fa-instagram'></i>
              <i className='fab mx-2 fa-youtube'></i>
              <i className='fab mx-2 fa-tiktok'></i>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
            
            </>}
           
            
         

          </ul>

        </div>
      </div>
    </nav>
  </>
}
