import { useAuthContext } from "./useAuthContext";
import {useWallContext} from './userWallContext';

export const useLogout = () => {
    const {dispatch} = useAuthContext();
    const {dispatch:wallDispatch} = useWallContext();
    const logout = () => {
        localStorage.removeItem('wallpp_user');
        dispatch({type:"LOGOUT"});
        wallDispatch({type:"SETWALLS",payload:null});
    };
    return {logout};
}