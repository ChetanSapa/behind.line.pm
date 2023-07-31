import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";

const Menu = ({server_host}) => {
    const [loading, setLoading] = useState(true)
    const [isAuth, setIsAuth] = useState(false)
    const [userRole, setUserRole] = useState(null)
    console.log(server_host)

    useEffect(() => {
        (async () => {
            await checkAuth()
        })()
    }, [])
    const checkAuth = async () => {
        setLoading(true)
        const res = await fetch(server_host + '/users/check/auth', {
            method: 'post',
            credentials: 'include'
        })
        const data = await res.json()
        if (data.ok) {
            setIsAuth(true)
            setLoading(false)
            setUserRole(data.role)
        }else{
            setIsAuth(false)
            setLoading(false)
        }
    }

    return (
        <div className={'menu'}>
            <div className={'menu-nav-btn'}>
                <span><NavLink to={'/'}>Main</NavLink></span>
                <span><NavLink to={'/dashboard'}>Dashboard</NavLink></span>
                {/*{userRole === 'admin' && <span><NavLink to={'/users'}>Users</NavLink></span>}*/}
                {userRole === 'admin' && <span><NavLink to={'/admin'}>Admin</NavLink></span>}
            </div>
            <div className="menu-auth-btn">
                {!isAuth && <span><NavLink to={'/login'}>Log In</NavLink></span>}
                {!isAuth && <span><NavLink to={'/signup'}>Sign Up</NavLink></span>}
                {isAuth && <span><a href={server_host + '/users/logout'}>Log Out</a></span>}
            </div>
        </div>
    );
};

export default Menu;