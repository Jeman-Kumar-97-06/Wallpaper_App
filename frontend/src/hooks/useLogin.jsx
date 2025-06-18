import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error,setError] = useState(null);
    const [isloading,setIsloading] = useState(null);
    const {dispatch} = useAuthContext();

    const login = async (name,password) => {
        setIsloading(true);
        setError(null);
        const resp = await fetch('https://wallpaperappbackend-production.up.railway.app/api/users/login',{
            method:"POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({name,password})
        });
        const json = await resp.json();
        if (!resp.ok) {
            setIsloading(false);
            setError(json.error);
        }
        else if (resp.ok) {
            localStorage.setItem('wallpp_user',JSON.stringify(json));
            dispatch({type:"LOGIN",payload:json});
            setIsloading(false);
            setError(null);
        }
    };
    return {login,error,isloading};
}