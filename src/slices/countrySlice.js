import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    countries: [],
    singleCountry: {}  // To store single country data. For now it's an empty object, but it will be filled with fetched data.  // Array to store countries data. For now it's an empty array, but it will be filled with fetched data.  // To store single country data. For now it's an empty object, but it will be filled with fetched data.  // To store single country data. For now it's an empty object, but it will be filled
  };
  

  const countrySlice = createSlice({ 
    name: 'country',
    initialState,
    reducers: {
        AddCountry:(state,action)=>{
            state.countries.push(action.payload)
        },
        FetchCountry:(state,action)=>{
          state.countries = action.payload
        },
        DeleteCountry:(state,action)=>{
            console.log("action payload",action.payload)
            state.countries = state.countries.filter(item => item._id!== action.payload._id)
        },
        FetchOneCountry:(state,action)=>{
            state.singleCountry = action.payload
        }
    }
  })


  
export const { AddCountry,FetchCountry,DeleteCountry,FetchOneCountry } = countrySlice.actions;

export default countrySlice.reducer;