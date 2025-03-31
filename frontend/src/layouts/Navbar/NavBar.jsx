import React from "react";
//e-commerce navbar
const NavBar = () => {
  return (
    <>
      <header className="fixed w-full flex items-center justify-between p-4 bg-slate-200 rounded-md ">
        <h1 className="text-5xl font-bold ">
          <span className="text-yellow-500">E</span>-
          <span className="text-yellow-500">C</span>ommerce
        </h1>
        <nav>
          <ul className="flex items-center gap-4">
            <li>Home</li>
            <li>Products</li>
            <li>Cart</li>
          </ul>
        </nav>
        <ul className="flex items-center gap-4">
          <li>panier</li>
          <li>profile</li>
        </ul>
      </header>
    </>
  );
};

export default NavBar;
