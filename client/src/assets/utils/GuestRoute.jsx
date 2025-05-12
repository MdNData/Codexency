import React from "react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Se incarca...</p>;
  if (user) return <Navigate to="/cont" replace />;

  return children;
};

export default GuestRoute;
