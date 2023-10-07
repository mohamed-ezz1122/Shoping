import axios from "axios";
import { createContext } from "react";

export let PasswordContext=createContext();



function forgetPasseord(values)
{
    return axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',values)
    .then((respons)=>respons)
    .catch((error)=>error)
}
function sendCode(values)
{
    console.log(values);
    return axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',values)
    .then((respons)=>respons)
    .catch((error)=>error)
}
export default function PasswordContextProvider(props)
{




    return <PasswordContext.Provider value={{forgetPasseord,sendCode}}>
             {props.children}
    </PasswordContext.Provider>
}