import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    promotional: []
  };
  

  const promotionalSlice = createSlice({ 
    name: 'promotional',
    initialState,
    reducers: {
        FetchPromotional:(state,action)=>{
          state.promotional = action.payload
        }

    }
  })


  
export const { FetchPromotional } = promotionalSlice.actions;

export default promotionalSlice.reducer;