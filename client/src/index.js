import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, createHashRouter, RouterProvider,} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import UserPage from "./pages/UserPage";
import AdsListPage from './pages/AdsListPage';
import AdPage from './pages/AdPage';
import CreateEditAdPage from './pages/CreateEditAdPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
let server_host = process.env.NODE_ENV === 'development' ? 'http://localhost:9001' : 'https://api.behind.line.pm'

// const router = createHashRouter([
//     {path: "/", element: <Home server_host={server_host}/>, },
//     {path: "/login", element: <Login server_host={server_host}/>,},
//     {path: "/signup", element: <Signup server_host={server_host}/>,},
//     {path: "/users", element: <Users server_host={server_host}/>,},
//     {path: "/users/:id", element: <UserPage server_host={server_host}/>,},
//     {path: "/dashboard", element: <Dashboard server_host={server_host}/>,},
//     {path: "/admin", element: <Admin server_host={server_host}/>,},
//     {path: "/ads", element: <AdsListPage server_host={server_host}/>},
//     {path: "/ads/category/:category", element: <AdsListPage server_host={server_host}/>},
//     {path: "/ads/:id", element: <AdPage server_host={server_host}/>},
//     {path: "/ads/create", element: <CreateEditAdPage server_host={server_host}/>},
//     {path: "/ads/edit/:id", element: <CreateEditAdPage server_host={server_host}/>},
//
// ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        {/*<RouterProvider router={router}/>*/}

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home server_host={server_host} />} />
                <Route path="/login" element={<Login server_host={server_host}/>} />
                <Route path="/signup" element={<Signup server_host={server_host}/>} />
                <Route path="/users" element={<Users server_host={server_host} />} />
                    <Route path=":id" element={<UserPage server_host={server_host}/>} />
                <Route path="/dashboard" element={<Dashboard server_host={server_host}/>} />
                <Route path="/admin" element={<Admin server_host={server_host}/>} />
                <Route path="/ads" element={<AdsListPage server_host={server_host}/>} />
                    <Route path="ads/:id" element={<AdPage server_host={server_host}/>} />
                    <Route path="ads/create" element={<CreateEditAdPage server_host={server_host}/>} />
                    <Route exact path="ads/edit/:id" element={<CreateEditAdPage server_host={server_host}/>} />
                    <Route path="ads/category/:category" element={<AdsListPage server_host={server_host}/>} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
reportWebVitals();
