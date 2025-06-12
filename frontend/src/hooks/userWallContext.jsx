import { useContext } from "react";
import {WallContext} from '../context/WallContext';

export const useWallContext = () => {
    const context = useContext(WallContext);
    if (!context) {
        throw Error("useWallContext must be used inside components that have access to the WallContext!");
    };
    return context;
}