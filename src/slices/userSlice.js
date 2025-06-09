import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    user: [],
     // To store single country data. For now it's an empty object, but it will be filled with fetched data.  // Array to store countries data. For now it's an empty array, but it will be filled with fetched data.  // To store single country data. For now it's an empty object, but it will be filled with fetched data.  // To store single country data. For now it's an empty object, but it will be filled
  };
  

  const userSlice = createSlice({ 
    name: 'user',
    initialState,
    reducers: {
        AddExtraUser:(state,action)=>{
            state.user.push(action.payload)
        },
        FetchExtraUser:(state,action)=>{
          state.user = action.payload
        }
    }
  })


  
export const {AddExtraUser,FetchExtraUser  } = userSlice.actions;

export default userSlice.reducer;