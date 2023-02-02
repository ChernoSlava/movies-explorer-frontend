import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { routerPath } from '../../constants'

export const ProtectedRoute = ({ loggedIn, children }) => {
  const location = useLocation();
  if(!loggedIn) {
    return <Navigate to={routerPath.login} state={{from: location}} replace />
  }
  
  return children
}
