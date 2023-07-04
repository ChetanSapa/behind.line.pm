import React from 'react';
import {NavLink} from "react-router-dom";

const Menu = () => {
    return (
        <div className={'menu'}>
            <div className={'menu-nav-btn'}>
                <span><NavLink to={'/'}>Main</NavLink></span>
            </div>
            <div className="menu-auth-btn">
                <span><NavLink to={'/login'}>Log In</NavLink></span>
                <span><NavLink to={'/signup'}>Sign Up</NavLink></span>
            </div>
        </div>
    );
};

export default Menu;