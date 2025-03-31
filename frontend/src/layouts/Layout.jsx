import React from "react";
import Footer from "./Footer/Footer";
import NavBar from "./Navbar/NavBar";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <main className="min-h-screen py-20">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
