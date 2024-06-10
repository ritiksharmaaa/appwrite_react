import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";



const store = configureStore({
    reducer : {
        auth : authSlice,
    }

});

export default store ;

// make store for as much you want likw store for auth store for diffrent diffrent portion of the part .