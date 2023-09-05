import React, {useEffect, useState} from 'react';
import Menu from "../components/Menu";
import {NavLink} from "react-router-dom";
import SearchPanel from "../components/SearchPanel";

const Users = ({server_host}) => {
    const [users, setUsers] = useState([])
    const [isAdmin, setIsAdmin] = useState()
    useEffect(loadUsers, [])
    console.log(users)

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


    return (
        <div className={'container'}>
            <Menu server_host={server_host}/>
            <h1>Users page</h1>
            <SearchPanel server_host={server_host} setUsers={setUsers} />
            {/*<span><NavLink to={'/users'}>Users</NavLink></span>*/}
            <div className={'users-page-list'}>
                {users.map(user => <div className={'users-page-list-user'} key={user._id}>
                    <NavLink to={'/users/' + user._id}>
                        <p>Id: {user._id}</p>
                        <p>Email: {user.email}</p>
                        <p>Role: {user.role}</p>
                        <p>System Name: {user.username}</p>
                        <p>Nikname: {user.name}</p>
                        <p>Birthday: {user.birthday}</p>
                        <p>About: {user.about}</p>
                        {/*<p>Files: {user.files}</p>*/}
                        {/*<div>Avatar: {user.avatar}</div>*/}
                    </NavLink>
                </div>)}
            </div>
        </div>
    );
};

export default Users;