import React from 'react'
import PartnerLayout from '../Layout/PartnerLayout'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import FranchiseLayout from '../Layout/FranchiseLayout';
import CounsellorLayout from '../Layout/CounsellorLayout';

export default function CounsellerRoutes() {
  const { userInfo } = useSelector((state) => state.auth);

   return userInfo?.role === "counsellor" ? <CounsellorLayout /> : <Navigate to='/' replace />

}

