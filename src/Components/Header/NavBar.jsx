import React, { useContext, useEffect, useState } from "react";
import { FaHome, FaInfoCircle, FaTags, FaUserCircle } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";

import logo from "/public/Images/Loogo3.png";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import Swal from "sweetalert2";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [showMessage, setShowMessage] = useState(true);
  const [toggle, setToggle] = useState(false); 
  const navigate = useNavigate();
  // console.log(user);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      customClass: {
        confirmButton: "bg-red-600 text-white hover:bg-red-700",
        cancelButton: "bg-gray-400 text-white hover:bg-gray-500",
      },
    }).then((result) => {
       if(result.isConfirmed){
        logOut();
        navigate("/");
       }
        
      })
      .catch((error) => {
        toast.error("Failed to log out. Please try again.");
        console.error(error);
      });
  };

  const link = (
    <>
      <li>
        <NavLink to="/">
          <p className="flex items-center gap-2">
            <FaHome />
            Home
          </p>
        </NavLink>
      </li>
      <li>
        <NavLink to="/brands">
          <p className="flex items-center gap-2">
            <FaTags />
            Brands
          </p>
        </NavLink>
      </li>
      <li>
        <NavLink to="/auth/my-profile">
          <p className="flex items-center gap-2">
            <FaUserCircle />
            My Profile
          </p>
        </NavLink>
      </li>
      <li>
        <NavLink to="/aboutus">
          <p className="flex items-center gap-2">
            <FaInfoCircle />
            About Dev
          </p>
        </NavLink>
      </li>
    </>
  );

   
  
  return (
    <div className="w-full mx-auto text-center">
      {user && user?.email && showMessage ? (
        <p className="font-semibold text-2xl text-blue-500">
          Welcome, {user.displayName}!
        </p>
      ) : (
        ""
      )}

      <div className="navbar w-11/12 mx-auto">
        {/* Navbar  Logo */}
        <div className="navbar-start text-center lg:text-left">
          <div className="dropdown lg:hidden">
            <button
              tabIndex={0}
              role="button"
              className="btn btn-ghost flex lg:hidden"
              onClick={() => setToggle(!toggle)} 
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className={`menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow ${
                toggle ? "block" : "hidden"
              }`} 
            >
              {link}
            </ul>
          </div>

          <Link to="/">
            {" "}
            <div className="flex gap-1">
              <img
                className="w-16 h-16 hidden md:flex rounded-full border-2 "
                src={logo}
                alt=""
              />
            </div>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{link}</ul>
        </div>

        <div className="navbar-end">
          <div className="hidden lg:flex items-center space-x-4">
            {user && user?.email ? (
              <div className="flex space-x-2">
                <p className=" font-semibold text-xl py-2">
                  {user && user.displayName}
                </p>
                <div className="py-1">
                  <img
                    className="w-10 h-10 rounded-full "
                    src={user?.photoURL}
                    alt=""
                  />
                </div>
                <button
                  onClick={handleLogOut}
                  className="btn bg-red-500 hover:bg-red-700 font-semibold text-white "
                >
                  Log out <IoIosLogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="space-x-3">
                <Link to="/auth/login">
                  <button className="btn btn-outline hover:bg-green-500">
                    <IoIosLogIn size={16} />
                    Login
                  </button>
                </Link>
                <Link to="/auth/register">
                  <button className="btn bg-green-500 text-white font-semibold hover:bg-green-600 btn-outline">
                    <FaUserPlus size={20} /> Register
                  </button>
                </Link>
              </div>
            )}
          </div>

          <div className="lg:hidden flex items-center">
            {user && user?.email ? (
              <div className="flex space-x-2">
                <div className="py-1">
                  <img
                    className="w-10 h-10 rounded-full "
                    src={user?.photoURL}
                    alt=""
                  />
                </div>
                <button
                  onClick={handleLogOut}
                  className="btn bg-red-500 hover:bg-red-700 font-semibold text-white"
                >
                  <IoIosLogOut size={20} />
                  Log out
                </button>
              </div>
            ) : (
              <div className="space-x-3">
                <Link to="/auth/login">
                  <button className="btn btn-outline">
                    <IoIosLogIn size={16} /> Login
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default NavBar;
