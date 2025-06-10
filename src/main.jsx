import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import PartnerRoutes from './Component/Routes/PartnerRoutes.jsx';
import LoginScreen from './Screen/LoginScreen.jsx';
import store from './store';
import DashboardScreen from './Screen/DashboardScreen.jsx';
import FrenchiseRoutes from './Component/Routes/FrenchiseRoutes.jsx';
import FrenchiseDashboard from './Screen/Frenchise/FrenchiseDashboard.jsx';
import PartnerUniversityScreen from './Screen/Partner/PartnerUniversityScreen.jsx';
import PartnerCountryScreen from './Screen/Partner/PartnerCountryScreen.jsx';
import PartnerCourseScreen from './Screen/Partner/PartnerCourseScreen.jsx';
import PartnerAddUserScreen from './Screen/Partner/PartnerAddUserScreen.jsx';
import PartnerViewUserScreen from './Screen/Partner/PartnerViewUserScreen.jsx';
import RedirectAfterLogin from './Component/Routes/RedirectAfterLogin.jsx';
import NotificationScreen from './Screen/NotificationScreen.jsx';
import PartnerCountryScreenDetailed from './Screen/Partner/PartnerCountryScreenDetailed.jsx';
import PartnerUniversityScreenDetailed from './Screen/Partner/PartnerUniversityScreenDetailed.jsx';
import PartnerAddStudentScreen from './Screen/Partner/PartnerAddStudentScreen.jsx';
import PartnerViewStudent from './Screen/Partner/PartnerViewStudent.jsx';
import StudentDetailedTrack from './Screen/Partner/StudentDetailedTrack.jsx';
import PartnerTrackStudent from './Screen/Partner/PartnerTrackStudent.jsx';
import PartnerProfile from './Screen/Partner/PartnerProfile.jsx';
import FrenchiseProfileScreen from './Screen/Frenchise/FrenchiseProfileScreen.jsx';
import CounsellerRoutes from './Component/Routes/CounsellerRoutes.jsx';
import PartnerTicketScreen from './Screen/Partner/PartnerTicketScreen.jsx';
import PartnerTicketAddScreen from './Screen/Partner/PartnerTicketAddScreen.jsx';
import PartnerKey from './Screen/Partner/PartnerKey.jsx';
import PartnerCreateProfile from './Screen/Partner/PartnerCreateProfile.jsx';
import PartnerAssessmentView from './Screen/Partner/PartnerAssessmentView.jsx';
import PartnerUsefulInformationScreen from './Screen/Partner/PartnerUsefulInformationScreen.jsx';
import PartnerCommissionScreen from './Screen/Partner/PartnerCommissionScreen.jsx';
import PartnerLoanScreen from './Screen/Partner/PartnerLoanScreen.jsx';
import PartnerLedgerScreen from './Screen/Partner/PartnerLedgerScreen.jsx';
import PartnerPromotionalScreen from './Screen/Partner/PartnerPromotionalScreen.jsx';
import PartnerPromotionalDetailedScreen from './Screen/Partner/PartnerPromotionalDetailedScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<LoginScreen />} />
      <Route path='/redirect' element={<RedirectAfterLogin />} />

      <Route element={<PartnerRoutes />}>
        <Route path=  '/partner/dashboard' element={<DashboardScreen/>} />
        <Route path=  '/partner/university' element={<PartnerUniversityScreen/>} />
        <Route path = '/partner/university/:id' element = {<PartnerUniversityScreenDetailed />} />
        <Route path = '/partner/country' element = {< PartnerCountryScreen/>} />
        <Route path = '/partner/course' element = {< PartnerCourseScreen/>} />
        <Route path = '/partner/addUser' element = {< PartnerAddUserScreen/>} />
        <Route path = '/partner/viewUser' element = {< PartnerViewUserScreen/>} />
        <Route path = '/partner/notification' element= {<NotificationScreen />} />
        <Route path = '/partner/country/:id' element= {<PartnerCountryScreenDetailed />} />
        <Route path = '/partner/student/add'  element={< PartnerAddStudentScreen />}/>
        <Route path = '/partner/student/view' element = {<PartnerViewStudent />} />
        <Route path = '/partner/student/:id' element = {<StudentDetailedTrack />} />
        <Route path = '/partner/student/track' element = {<PartnerTrackStudent />} />
        <Route path = '/partner/profile' element= {<PartnerProfile />} />
        <Route path = '/partner/ticket/add' element= {<PartnerTicketAddScreen />} />
        <Route path = '/partner/ticket/view' element= {<PartnerTicketScreen />} />
        <Route path = '/partner/key' element = {<PartnerKey />} />
        <Route path = '/partner/profile/create' element = {<PartnerCreateProfile />} />
        <Route path = '/partner/assessment/view' element = {< PartnerAssessmentView/>} />
        <Route path = '/partner/usefullinformation'  element = {<PartnerUsefulInformationScreen />} />      
        <Route path = '/partner/commission' element = {< PartnerCommissionScreen />} />
        <Route path = '/partner/loan' element = {<PartnerLoanScreen />} />
        <Route path = '/partner/transaction' element = {<PartnerLedgerScreen />} />
        <Route path= '/partner/promotional' element= {<PartnerPromotionalScreen />} />
        <Route path= '/partner/promotional/:id' element= {<PartnerPromotionalDetailedScreen />} />



      </Route>
      <Route element={<FrenchiseRoutes />}>
        <Route path=  '/frenchise/dashboard' element={<DashboardScreen/>} />
        <Route path=  '/frenchise/university' element={<PartnerUniversityScreen/>} />
        <Route path = '/frenchise/university/:id' element = {<PartnerUniversityScreenDetailed />} />

        <Route path = '/frenchise/country' element = {< PartnerCountryScreen/>} />
        <Route path = '/frenchise/course' element = {< PartnerCourseScreen/>} />

        <Route path = '/frenchise/addUser' element = {< PartnerAddUserScreen/>} />
        <Route path = '/frenchise/viewUser' element = {< PartnerViewUserScreen/>} />
        <Route path = '/frenchise/notification' element= {<NotificationScreen />} />
        <Route path = '/frenchise/country/:id' element= {<PartnerCountryScreenDetailed />} />
        <Route path = '/frenchise/student/add'  element={< PartnerAddStudentScreen />}/>
        <Route path = '/frenchise/student/view' element = {<PartnerViewStudent />} />
        <Route path = '/frenchise/student/:id' element = {<StudentDetailedTrack />} />
        <Route path = '/frenchise/student/track' element = {<PartnerTrackStudent />} />
        <Route path = '/frenchise/profile' element= {<FrenchiseProfileScreen />} />
        <Route path= '/frenchise/ticket/add' element= {<PartnerTicketAddScreen />} />
        <Route path= '/frenchise/ticket/view' element= {<PartnerTicketScreen />} />
        <Route path= '/frenchise/key' element = {<PartnerKey />} />
        <Route path = '/frenchise/profile/create' element = {<PartnerCreateProfile />} />
        <Route path = '/frenchise/assessment/view' element = {< PartnerAssessmentView/>} />
        <Route path = '/frenchise/usefullinformation'  element = {<PartnerUsefulInformationScreen />} />  
        <Route path = '/frenchise/commission' element = {< PartnerCommissionScreen />} />
        <Route path = '/frenchise/transaction' element = {<PartnerLedgerScreen />} />
        <Route path= '/frenchise/promotional' element= {<PartnerPromotionalScreen />} />
        <Route path= '/frenchise/promotional/:id' element= {<PartnerPromotionalDetailedScreen />} />
        <Route path = '/frenchise/loan' element = {<PartnerLoanScreen />} />
    

      </Route>
      <Route element={<CounsellerRoutes />}>
        <Route path=  '/counsellor/dashboard' element={<DashboardScreen/>} />
        <Route path=  '/counsellor/university' element={<PartnerUniversityScreen/>} />
        <Route path = '/counsellor/university/:id' element = {<PartnerUniversityScreenDetailed />} />
        <Route path = '/counsellor/country' element = {< PartnerCountryScreen/>} />
        <Route path = '/counsellor/course' element = {< PartnerCourseScreen/>} />
        <Route path = '/counsellor/notification' element= {<NotificationScreen />} />
        <Route path = '/counsellor/country/:id' element= {<PartnerCountryScreenDetailed />} />
        <Route path = '/counsellor/student/add'  element={< PartnerAddStudentScreen />}/>
        <Route path = '/counsellor/student/view' element = {<PartnerViewStudent />} />
        <Route path = '/counsellor/student/:id' element = {<StudentDetailedTrack />} />
        <Route path = '/counsellor/student/track' element = {<PartnerTrackStudent />} />
        <Route path= '/counsellor/ticket/add' element= {<PartnerTicketAddScreen />} />
        <Route path= '/counsellor/ticket/view' element= {<PartnerTicketScreen />} />
        <Route path= '/counsellor/key' element = {<PartnerKey />} />
        <Route path = '/counsellor/profile/create' element = {<PartnerCreateProfile />} />
        <Route path = '/counsellor/assessment/view' element = {< PartnerAssessmentView/>} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
)
