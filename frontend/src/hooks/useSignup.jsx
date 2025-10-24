import {useState} from 'react';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    const [error,setError]         = useState(null);
    const [isloading,setIsloading] = useState(null);
    const {dispatch}               = useAuthContext();

    const signup = async (name,email,password) => {
        setIsloading(true);
        setError(null);
        const resp = await fetch('/api/users/signup',{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,email,password})});
        const json = await resp.json();
        console.log(json)
        if (!resp.ok) {
            setIsloading(false);
            setError(json.error);
        }
        if (resp.ok) {
            console.log(json._doc)
            localStorage.setItem('wallpp_user',JSON.stringify(json._doc));
            dispatch({type:"LOGIN",payload:json});
            setIsloading(false);
        }
        
    }
    return {signup,error,isloading};
}