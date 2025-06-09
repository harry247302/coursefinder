import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import countryReducer from './slices/countrySlice';
import universityReducer from './slices/universitySlice';
import provinceReducer from './slices/provinceSlice';
import courseReducer from './slices/courseSlice';
import notificationsReducer from './slices/notificationSlice';
import SecondCountryReducer from './slices/secondCountrySlice';
import studentReducer from './slices/studentSlice';
import promotionalReducer from './slices/promotionalSlice'
import assessmentReducer from './slices/assessmentSlice'
import popupReducer from './slices/popUpSlice'
import { apiSlice } from './slices/apiSlice';




const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    country:countryReducer,
    university:universityReducer,
    province: provinceReducer,
    course: courseReducer,
    notifications:notificationsReducer,
    SecondCountry:SecondCountryReducer,
    student:studentReducer,
    promotional:promotionalReducer,
    assessment:assessmentReducer,
    popup:popupReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
