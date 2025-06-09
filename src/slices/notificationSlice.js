import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    notification:[],
  
  };
  

  const notificationSlice = createSlice({ 
    name: 'notification',
    initialState,
    reducers: {
        FetchNotifcation:(state,action)=>{
          state.notification = action.payload
        }
    }
  })


  
export const { FetchNotifcation } = notificationSlice.actions;

export default notificationSlice.reducer;