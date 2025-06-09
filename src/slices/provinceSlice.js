import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    province: [],
    singleProvince: {}  // To store single country data. For now it's an empty object, but it will be filled with fetched data.  // Array to store countries data. For now it's an empty array, but it will be filled with fetched data.  // To store single country data. For now it's an empty object, but it will be filled with fetched data.  // To store single country data. For now it's an empty object, but it will be filled
  };
  

  const provinceSlice = createSlice({ 
    name: 'province',
    initialState,
    reducers: {
        AddProvince:(state,action)=>{
            state.province.push(action.payload)
        },
        FetchProvinces:(state,action)=>{
          state.province = action.payload
        },
        DeleteOneProvince:(state,action)=>{
            console.log("action payload",action.payload)
            state.province = state.province.filter(item => item._id!== action.payload._id)
        },
        FetchOneProvinces:(state,action)=>{
            state.singleProvince = action.payload
        }
    }
  })


  
export const { AddProvince,FetchProvinces,DeleteOneProvince,FetchOneProvinces } = provinceSlice.actions;

export default provinceSlice.reducer;