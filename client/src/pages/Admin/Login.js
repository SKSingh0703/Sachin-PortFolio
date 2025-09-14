import { message } from "antd";
import axios from "axios";
import React from "react";
// import { useState, } from "react";
import { HideLoading, ShowLoading } from "../../redux/rootSlice";
import { useDispatch } from "react-redux";
import API_URL from "../../config";
import { useNavigate } from "react-router-dom";

function Login() {
  const [user, setUser] = React.useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(`${API_URL}/admin-login`, user);
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.success);
        localStorage.setItem("token", JSON.stringify(response.data));
        // window.location.href = '/admin';
        navigate("/admin");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-primary dark:bg-primary-light transition-colors duration-300">
      <div className="w-96 flex flex-col gap-6 p-8 shadow-2xl rounded-xl border border-tertiary/20 dark:border-tertiary-light/20 bg-white dark:bg-gray-100 transition-colors duration-300">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary dark:text-primary-light mb-2">
            Portfolio
          </h1>
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-800">
            Admin Login
          </h2>
        </div>
        <hr className="border-t-2 border-tertiary/30 dark:border-tertiary-light/30" />

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-800 mb-2">
              Username
            </label>
            <input
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="Enter your username"
              className="w-full p-3 border border-gray-300 dark:border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiary dark:focus:ring-tertiary-light focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-50 text-gray-900 dark:text-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-800 mb-2">
              Password
            </label>
            <input
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 dark:border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-tertiary dark:focus:ring-tertiary-light focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-50 text-gray-900 dark:text-gray-800"
            />
          </div>
        </div>

        <div className="space-y-3">
          <button
            className="w-full btn-primary"
            onClick={login}
          >
            Login
          </button>
          <button
            className="w-full btn-secondary" 
            onClick={()=>navigate(`/`)} 
          >
            Return to Portfolio
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
