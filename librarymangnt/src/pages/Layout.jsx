import React, { useEffect, useState } from "react";
import Headers from "../components/Header";
import Home from "./Home";
import Cookies from "js-cookie";
import axios from "axios";
import BookCard from "../components/BookCard";
import { Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AuthorDashboard from "./Author/AuthorDashboard";
import Footer from "../components/Footer";

const Layout = () => {
  const { user } = useAuth();
  if (user && user.role === "author") {
    return (
      <div>
        <AuthorDashboard />
      </div>
    );
  }

  return (
    <div>
      <Headers />

      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
