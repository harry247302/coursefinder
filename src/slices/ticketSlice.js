import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    ticket: [],
  };
  

  const ticketSlice = createSlice({ 
    name: 'ticket',
    initialState,
    reducers: {
        AddTicket:(state,action)=>{
            state.ticket.push(action.payload)
        },
        FetchOneTicket:(state,action)=>{
          state.ticket = action.payload
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


  
export const { AddTicket } = ticketSlice.actions;

export default ticketSlice.reducer;