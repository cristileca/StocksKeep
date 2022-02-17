import { Outlet } from "react-router-dom";
import Signup from "../components/signup";
import Login from "../components/Login";
import AuthProvider from "../context/AuthContext";
import app, { auth } from "../firebase";
import firebase from "firebase/compat/app";
import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoutes = () => {
  const { currentUser } = useAuth();

  return currentUser ? <Outlet /> : <Login />;
};

export default ProtectedRoutes;
