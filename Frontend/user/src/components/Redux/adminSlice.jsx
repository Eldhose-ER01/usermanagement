import { createSlice } from "@reduxjs/toolkit";
const adminSlice=createSlice({
    name:"admin",
    initialState:{
        admindata:{
            email:null,
            token:null
        }
       
    },reducers:{
        adminlogin:(state,action)=>{
            state.admindata.email=action.payload.email
            state.admindata.token=action.payload.token
            
        } ,removeUser:(state,action)=>{
            state.admindata.email=null
            state.admindata.token=null
        },

        
    }




})
export const{adminlogin,removeUser}=adminSlice.actions
export default adminSlice.reducer