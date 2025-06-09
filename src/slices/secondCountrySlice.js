import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    countries: [],
    singleCountry: {}  // To store single country data. For now it's an empty object, but it will be filled with fetched data.  // Array to store countries data. For now it's an empty array, but it will be filled with fetched data.  // To store single country data. For now it's an empty object, but it will be filled with fetched data.  // To store single country data. For now it's an empty object, but it will be filled
  };
  

  const SecondCountrySlice = createSlice({ 
    name: 'SecondCountry',
    initialState,
    reducers: {
        FetchSecondCountry:(state,action)=>{
          state.countries = action.payload
        },
        FetchOneSecondCountry:(state,action)=>{
            state.singleCountry = action.payload
        }
    }
  })


  
export const { FetchSecondCountry,FetchOneSecondCountry } = SecondCountrySlice.actions;

export default SecondCountrySlice.reducer;