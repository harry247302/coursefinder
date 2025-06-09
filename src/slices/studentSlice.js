import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    student: [],
  };
  

  const studentSlice = createSlice({ 
    name: 'student',
    initialState,
    reducers: {
        AddStudent:(state,action)=>{
            state.student.push(action.payload)
        },
        fetchStudent:(state,action)=>{
            state.student = action.payload;
        }
        
    }
  })


  
export const { AddStudent,fetchStudent } = studentSlice.actions;

export default studentSlice.reducer;