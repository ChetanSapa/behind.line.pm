import React, {useEffect, useState} from 'react';
import Menu from "../components/Menu";
import {NavLink} from "react-router-dom";
import SearchPanel from "../components/SearchPanel";

const Admin = ({server_host}) => {

    const [users, setUsers] = useState([])
    const [isAdmin, setIsAdmin] = useState()
    useEffect(loadUsers, [])

    function loadUsers() {
        fetch(server_host + '/users/get/all', {
            method: 'get',
            credentials: 'include',
        }).then(res => {
            return res.json()
        }).then(data => {
            setUsers(data.users)
            setIsAdmin(data.isAdmin)
        })
    }
    console.log(users)
    console.log(isAdmin)

    return (
        <div className={'container'}>
            <Menu server_host={server_host}/>
            <h1>Admin page</h1>
            <SearchPanel server_host={server_host} setUsers={setUsers} />
            {/*<span><NavLink to={'/users'}>Users</NavLink></span>*/}
            <div className={'users-page-list'}>

                {users.map(user => <div className={'users-page-list-user'} key={user._id}>
                    <NavLink to={'/users/' + user._id}>
                        <p>Id: {user._id}</p>
                        <p>Email: {user.email}</p>
                        <p>Password: {user.password}</p>
                        <p>Role: {user.role}</p>
                        <p>System Name: {user.username}</p>
                        <p>Nikname: {user.name}</p>
                        <p>Birthday: {user.birthday}</p>
                        <p>About: {user.about}</p>
                    </NavLink>
                </div>)}
            </div>
        </div>
    );
};

export default Admin;