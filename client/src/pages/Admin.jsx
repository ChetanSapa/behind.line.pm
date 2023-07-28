import React, {useEffect, useState} from 'react';
import Menu from "../components/Menu";
import {NavLink} from "react-router-dom";

const Admin = ({server_host}) => {

    const [users, setUsers] = useState([])
    useEffect(loadUsers, [])

    function loadUsers() {
        fetch('http://localhost:9001/users/get/all', {
            method: 'get',
            credentials: 'include',
        }).then(res => {
            return res.json()
        }).then(data => {
            setUsers(data.users)
        })
    }

    return (
        <div className={'container'}>
            <Menu server_host={server_host} />
            <h1>Admin page</h1>
            {/*<span><NavLink to={'/users'}>Users</NavLink></span>*/}
            <div className={'users-list'}>
                {users.map(user => <div className={'users-list-user'} key={user._id}>
                    <p>Id: {user._id}</p>
                    <p>Email: {user.email}</p>
                    <p>Role: {user.role}</p>
                    <p>Name: {user.username}</p>
                </div>)}
            </div>
        </div>
    );
};

export default Admin;