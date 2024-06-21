// if you see other configuration this file is not there but no matter we can put anywhere we juct need to work . 


import {createSlice} from "@reduxjs/toolkit";


const initialState = {
status : false,
userData : null 
}

const AuthSlice = createSlice({
name : "auth",
initialState ,
reducers : {
    login: (state , action) => {
        state.status = true ;
        state.userData = action.payload.userData ;
        // console.log("suceffully save userdat in store " , state.userData)
    },
    logout : (state) => {
        state.status = false;
        state.userData = null ;

    }

}
})

export const {login , logout} = AuthSlice.actions;
export default AuthSlice.reducer 