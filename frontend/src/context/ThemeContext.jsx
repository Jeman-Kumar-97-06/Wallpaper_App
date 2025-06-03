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
        
    },[])
    return (
        <ThemeContext.Provider value={{...state,dispatch}}>
            {children}
        </ThemeContext.Provider>
    )
}