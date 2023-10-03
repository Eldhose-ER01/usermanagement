import { createSlice } from "@reduxjs/toolkit"
const userSlice=createSlice(
    {
        name:"user",
        initialState:{
            userD:{
                id:null,
                name:null,
                token:null
            }
        },
        reducers:{
            addUser:(state,action)=>{
                state.userD.id=action.payload.id
                state.userD.name=action.payload.name
                state.userD.token=action.payload.token

            },
            removeuser:(state,action)=>{
                state.userD.id=null
                state.userD.name=null
                state.userD.token=null

            },
           
        }
    }
)
export const{addUser,removeuser}=userSlice.actions
export default userSlice.reducer