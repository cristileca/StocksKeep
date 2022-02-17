import React, { Component } from "react";
import Signup from "./signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../context/AuthContext";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import DashBoard from "./DashBoard";
import Login from "./Login";
import Stocks from "./stocks";
import ProtectedRoutes from "../context/ProtectedRoutes";

function App() {
  return (
    <Container
      className="d-flex align-center justify-content-center "
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/stocks" element={<Stocks />} />
                <Route exact path="/" element={<DashBoard />} />
              </Route>
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
