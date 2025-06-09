import React from 'react'
import PartnerLayout from '../Layout/PartnerLayout'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function PartnerRoutes() {
  const { userInfo } = useSelector((state) => state.auth);

   return userInfo?.role === "partner" ? <PartnerLayout /> : <Navigate to='/' replace />

}

