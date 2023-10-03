import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import adminSlice from "./adminSlice";
// import storage from 'redux-persist/lib/storage';
// import { persistReducer } from 'redux-persist';
// import { combineReducers } from '@reduxjs/toolkit';


// const persistcofigure={
//     key:'root',
//     version:1,
//     storage,
// };

// const reducer=combineReducers({
//     user:
// })
// const persistReducer=persistReducer(persistcofigure,reducer)
// const store=configureStore({
//     reducer:persistReducer,
// })


const store=configureStore({
    reducer:{
        user:userSlice,
        admin:adminSlice
    }
})
export default store