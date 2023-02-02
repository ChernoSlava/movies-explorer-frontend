import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { ROUTER_PATH } from '../../constants'

export const ProtectedRoute = ({ loggedIn, children }) => {
  const location = useLocation();
  if(!loggedIn) {
    return <Navigate to={ROUTER_PATH.MAIN} state={{from: location}} replace />
  }
  
  return children
}
