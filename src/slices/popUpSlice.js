import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    popup: []
  };
  

  const popUpSlice = createSlice({ 
    name: 'popup',
    initialState,
    reducers: {
        AddPopup:(state,action)=>{
            state.popup.push(action.payload)
        },
        FetchPopup:(state,action)=>{
          state.popup = action.payload
        },
        DeletePopupState:(state,action)=>{
            console.log("action payload",action.payload)
            state.popup = state.popup.filter(item => item._id!== action.payload[0])
        }

    }
  })


  
export const { AddPopup,FetchPopup,DeletePopupState } = popUpSlice.actions;

export default popUpSlice.reducer;