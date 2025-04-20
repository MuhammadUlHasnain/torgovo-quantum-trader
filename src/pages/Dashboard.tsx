
import React from "react";
import { Navigate } from "react-router-dom";

// This is just a redirect component to the dashboard home
const Dashboard = () => {
  return <Navigate to="/dashboard" replace />;
};

export default Dashboard;
