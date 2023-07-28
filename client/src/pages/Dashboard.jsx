import React, {useEffect, useState} from 'react';
import Menu from "../components/Menu";
import '../index.css'
import {NavLink} from "react-router-dom";

const Dashboard = ({server_host}) => {
    const [loading, setLoading] = useState(true)
    const [isAuth, setIsAuth] = useState(false)
    const [user, setUser] = useState({username: ''})
    const [message, setMessage] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)

    function getUserData(name, value) {
        setUser({
            ...user,
            [name]: value
        })
    }


    useEffect(() => {
        (async () => {
            await checkAuth()
        })()
    }, [])
    const checkAuth = async () => {
        const res = await fetch(server_host + '/users/check/auth', {
            method: 'post',
            credentials: 'include'
        })
        const data = await res.json()
        if (data.ok) {
            setIsAuth(true)
            setLoading(false)
            await loadData()
        } else {
            setIsAuth(false)
            setLoading(false)
        }
    }
    const loadData = async () => {
        const res = await fetch(server_host + '/users/me', {
            method: 'get',
            credentials: 'include'
        })
        const data = await res.json()
        if (data.ok) {
            setUser({...data.user})
        } else {
        }
    }
    const updateName = async () => {
        setIsDisabled(true)
        const res = await fetch(server_host + '/users/update', {
            method: 'post',
            credentials: 'include',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        setMessage(data.message)
        setIsDisabled(false)
    }


    if (loading) {
        return (
            <div className={'container'}>
                <h1>Loading. Please wait...</h1>
            </div>
        );
    }

    if (!isAuth) {
        return (
            <div className={'container'}>
                <span>To visit this page you need to <NavLink to={'/login'}>Log In</NavLink></span>
            </div>
        );
    }

    if (isAuth) {
        return (
            <div className={'container'}>
                <Menu server_host={server_host}/>
                <div className={'dashboard-form'}>
                    <h1>Dashboard</h1>
                    <div className="message">{message}</div>
                    <form>
                        <label>User name</label>
                        {/*<div className="message">{message}</div>*/}
                        <input type="text"
                               value={user.username}
                               onChange={(e) => getUserData('username', e.target.value)}/>
                        <button type={'button'} onClick={updateName} disabled={isDisabled}>Save</button>
                    </form>
                </div>
            </div>
        );
    }
};

export default Dashboard;