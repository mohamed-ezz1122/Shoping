import axios from "axios";
import { createContext, useEffect, useState } from "react";


export let cartContext=createContext();


let headers={
    token:localStorage.getItem('userToken')
}
function addToCart(id)
{
    
    return axios.post('https://ecommerce.routemisr.com/api/v1/cart',{
        productId:id
    },
    {
        headers
    }).then((respons)=>respons)
    .catch((error)=>error)
}
function GetLoggedUserCart()
{
    
    return axios.get('https://ecommerce.routemisr.com/api/v1/cart', 
   
    {
        headers:headers
    }).then((respons)=>respons)
    .catch((error)=>error)
}


function deletProduct(id)
{
    
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        headers:headers
})
    .then((respons)=>respons)
    .catch((error)=>(error))
}
function updateCount(id,count)
{
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count},{headers})
    .then((respons)=>respons)
    .catch((error)=>error)
}
function chickOutSession(cartId,values)
{
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
    {shippingAddress:values},
    {headers})
    .then((respons)=>respons)
    .catch((error)=>error)
}
function clarCart()
{
    return axios.delete('https://ecommerce.routemisr.com/api/v1/cart',{headers})
    .catch((respons)=>respons)
    .then((error)=>error)
}

export default function CartContextProvider(props)
{
    const [cartCount, setCartCount] = useState(null)
  const [cardId, setCardId] = useState(null)
  async function getCardId(){

       let {data}=await GetLoggedUserCart()
       
       setCardId(data?.data._id)
   }
   async function getCountCarts()
  {
    let {data}=await GetLoggedUserCart()
    setCartCount(data)
    
  }
  



useEffect(()=>{
    getCardId();
    getCountCarts()

},[])

    return <cartContext.Provider value={{addToCart,GetLoggedUserCart,deletProduct,updateCount,chickOutSession,cardId,cartCount,setCartCount,clarCart}}>


     {props.children}
    </cartContext.Provider>
}