import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    university: [],
    singleUniversity: {}  // To store single country data. For now it's an empty object, but it will be filled with fetched data.  // Array to store countries data. For now it's an empty array, but it will be filled with fetched data.  // To store single country data. For now it's an empty object, but it will be filled with fetched data.  // To store single country data. For now it's an empty object, but it will be filled
  };
  const universitySlice = createSlice({ 
    name: 'university',
    initialState,
    reducers: {
        AddUniversity:(state,action)=>{
            state.university.push(action.payload)
        },
        FetchUniversitys:(state,action)=>{
          state.university = action.payload
        },
        DeleteOneUniversity:(state,action)=>{
            console.log("action payload",action.payload)
            state.university = state.university.filter(item => item._id!== action.payload._id)
        },
        FetchOneUniversitys:(state,action)=>{
            state.singleUniversity = action.payload
        }
    }
  })


  
export const { AddUniversity,FetchUniversitys,DeleteOneUniversity,FetchOneUniversitys } = universitySlice.actions;

export default universitySlice.reducer;
