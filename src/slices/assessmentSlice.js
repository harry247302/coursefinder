import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    assessment: [],
};
  

  const assessmentSlice = createSlice({ 
    name: 'assessment',
    initialState,
    reducers: {
        fetchAssessment:(state,action)=>{
            state.assessment = action.payload;
        }
        
    }
  })


  
export const { fetchAssessment } = assessmentSlice.actions;

export default assessmentSlice.reducer;