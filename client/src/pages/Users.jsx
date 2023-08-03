import React, {useEffect, useState} from 'react';
import Menu from "../components/Menu";
const Users = ({server_host}) => {
    const [users, setUsers] = useState([])
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
        })
    }

    return (
        <div className={'container'}>
            <Menu server_host={server_host} />
            <h1>Users</h1>
            <div className={'users-list'}>
                <div className="users-email">
                    <span>User email</span>
                    {users.map(u => <div key={u._id}>{u.email}</div>)}
                </div>
                <div className="users-pass">
                    <span>User pass</span>
                    {users.map(u => <div key={u._id}>{u.password}</div>)}
                </div>
                <div className="users-role">
                    <span>User role</span>
                    {users.map(u => <div key={u._id}>{u.role}</div>)}
                </div>
            </div>
        </div>
    );
};

export default Users;