import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";

const server_host = process.env.NODE_ENV === 'development' ? 'http://localhost:9001' : 'https://api.behind.line.pm'
const router = createBrowserRouter([
    {path: "/", element: <Home server_host={server_host} />,},
    {path: "/login", element: <Login server_host={server_host} />,},
    {path: "/signup", element: <Signup server_host={server_host} />,},
    {path: "/users", element: <Users server_host={server_host} />,},
    {path: "/dashboard", element: <Dashboard server_host={server_host} />,},
    {path: "/admin", element: <Admin server_host={server_host} />,},
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
