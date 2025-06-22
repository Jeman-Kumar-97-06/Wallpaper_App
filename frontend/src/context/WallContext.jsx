import {useReducer,createContext} from 'react';

export const WallContext = createContext();

const initialState = {
    walls:[],
    allWalls:[],
}

export const wallReducer = (state,action) => {
    switch(action.type) {
        case "SETFWALLS":
            return {...state,walls:action.payload}
        case "SETWALLS":
            return {walls:action.payload,allWalls:action.payload}
        case "UPLOADWALLS":
            return {walls:[action.payload,...state.walls],allWalls:[action.payload,...state.allWalls]}
        default:
            return state;
    }
}

export const WallContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(wallReducer,{...initialState});
    return (
        <WallContext.Provider value={{...state,dispatch}}>
            {children}
        </WallContext.Provider>
    )
}