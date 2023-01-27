import React from "react";
import { Navigate } from "react-router-dom";

import { routerPath } from '../../constants'

export const ProtectedRoute = ({ loggedIn, children }) => {
  if(!loggedIn) {
    return <Navigate to={routerPath.login} replace/>
  }
  return children
}
