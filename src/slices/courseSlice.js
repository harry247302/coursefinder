import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    courses: [],
    singleCourse: {},
    fetchedLinks: {} ,
    compare: [] // To store single country data. For now it's an empty object, but it will be filled with fetched data.  // Array to store countries data. For now it's an empty array, but it will be filled with fetched data.  // To store single country data. For now it's an empty object, but it will be filled with fetched data.  // To store single country data. For now it's an empty object, but it will be filled
  };
  

  const courseSlice = createSlice({ 
    name: 'course',
    initialState,
    reducers: {
        AddCourse:(state,action)=>{
            state.courses.push(action.payload)
        },
        FetchCourses:(state,action)=>{
          state.courses = action.payload
        },
        DeleteCourse:(state,action)=>{
           
            state.courses = state.courses.filter(item => item._id!== action.payload._id)
        },
        FetchOneCourses:(state,action)=>{
            state.singleCourse = action.payload
        },
        FetchedLinked: (state,action)=>{
          state.fetchedLinks = action.payload;
        },
        AddCompareCourse: (state, action) => {
          if (state.compare.length < 3) {
            state.compare.push(action.payload);
          }
        },
        RemoveCompareCourse: (state, action) => {
          const courseId = action.payload; // Assuming payload is just the id
          console.log("Removing course with ID:", courseId);
          state.compare = state.compare.filter(course => course._id !== courseId);
          console.log("Updated compare array:", state.compare);
        },
        clearCompare: (state) => {
          state.compare = [];
        },
    }
  })


  
export const { AddCourse,FetchCourses,DeleteCourse,FetchOneCourses ,FetchedLinked,AddCompareCourse,RemoveCompareCourse,clearCompare} = courseSlice.actions;

export default courseSlice.reducer;