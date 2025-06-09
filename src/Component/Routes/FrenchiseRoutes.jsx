import React from 'react'
import PartnerLayout from '../Layout/PartnerLayout'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import FranchiseLayout from '../Layout/FranchiseLayout';

export default function FrenchiseRoutes() {
  const { userInfo } = useSelector((state) => state.auth);

   return userInfo?.role === "franchise" ? <FranchiseLayout /> : <Navigate to='/' replace />

}

