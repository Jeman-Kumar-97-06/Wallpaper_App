import {createContext, useEffect, useReducer} from 'react';

export const ThemeContext = createContext();

export const themeReducer = (state,action) => {
    switch(action.type) {
        case "LIGHT":
            return {theme:'dark'}
        case "DARK":
            return {theme:'light'}
        default:
            return state
    }
} 

export const ThemeContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(themeReducer,{theme:'light'});
    useEffect(()=>{
        const them_e = localStorage.getItem('wall_theme');
        console.log(them_e)
        if (them_e =='light') {
            dispatch({type:"LIGHT"});
        }
        if (them_e =='dark') {
            dispatch({type:"DARK"});
        }
    },[])
    return (
        <ThemeContext.Provider value={{...state,dispatch}}>
            {children}
        </ThemeContext.Provider>
    )
}