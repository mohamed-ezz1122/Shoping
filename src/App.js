import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Components/Home/Home'
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
import Brands from './Components/Brands/Brands'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Categories from './Components/Categories/Categories'
import Layout from './Components/Layout/Layout'
import UserContextProvider from './Context/UserContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import {ReactQueryDevtools}from 'react-query/devtools';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import Profile from './Components/Profile/Profile';
import Address from './Components/Address/Address';
import Orders from './Components/Allorders/Orders';
import NotFound from './Components/NotFound/NotFound';
import ForgetPassword from './Components/ForgetPasseord/ForgetPassword';
import PasswordContextProvider from './Context/PasswordContext';



let routes = createBrowserRouter([
  { path: '/', element: <Layout />, children: [
    {path:'profile' , element:<ProtectedRoute><Profile/></ProtectedRoute>},
    {index:true , element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'Products' , element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:'Cart' , element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'Categories' , element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:'Brands' , element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'/address' , element:<ProtectedRoute><Address/></ProtectedRoute>},
    {path:'productDetails/:id' , element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'/allorders' , element:<ProtectedRoute><Orders/></ProtectedRoute>},
    {path:'Login' , element:<Login/>},
    {path:'Register' , element:<Register/>},
    {path:'forgetPasseord' , element:<ForgetPassword/>},
    
    
    
    
    
    
    
    
    {path:'*' , element:<NotFound/>},









  ] }
])

function App() {
  
  return <PasswordContextProvider>
  <CartContextProvider>
    <UserContextProvider>

<RouterProvider router={routes}></RouterProvider>
<ReactQueryDevtools initiolIsOpen="false" position='bottom-right'/>
<Toaster />
</UserContextProvider>
  </CartContextProvider>
  
  </PasswordContextProvider> 
  
}

export default App;
