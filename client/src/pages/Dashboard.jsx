import React, {useEffect, useState} from 'react';
import Menu from "../components/Menu";
import '../index.css'
import {NavLink, useNavigate} from "react-router-dom";
import axios from "axios";
import Gallery from "../components/Gallery";
import DashboardAd from "../components/DashboardAd";

const Dashboard = ({server_host}) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [isAuth, setIsAuth] = useState(false)
    const [user, setUser] = useState({username: '', name: '', birthday: '', about: ''})
    const [message, setMessage] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)
    const [files, setFiles] = useState([])
    const [progress, setProgress] = useState()
    const [ads, setAds] = useState([])

    function getUserData(name, value) {
        setUser({
            ...user,
            [name]: value
        })
    }

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
    const loadAds = () => {
        fetch(server_host + '/ads/my', {
            method: 'get',
            credentials: "include"
        }).then(res => {
            return res.json()
        }).then(data => {
            if (data.ok) {
                setAds(data.ads)
            }
        })
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


    const deleteAd = (ad) => {
        console.log(ad)
        fetch(server_host + '/ads/delete', {
            method: 'post',
            credentials: "include",
            body: JSON.stringify({_id: ad}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json()
        }).then(data => {
            if (data.ok) {
                setAds(data.ads)
                console.log(data.ok)
            }
        })
    }

    useEffect(() => {
        (async () => {
            await checkAuth()
        })()
        loadAds()
    }, [loading])

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

    const submitAvatar = (e) => {
        setMessage('')
        e.preventDefault()
        let formData = new FormData()
        formData.append("file", files[0])
        console.log(formData)
        console.log(files[0])

        axios.post(server_host + '/files/uploads', formData, {
            withCredentials: true,
            headers: {
                "Content-Type": 'multipart/form-data'
            },
            onUploadProgress: data => {
                setProgress(Math.floor(100 * data.loaded) / data.total)
            }
        }).catch(e => setMessage("Error" + e))
    }
    function createAdDraft() {
        return fetch(server_host + '/ads/save', {
            method: 'post',
            credentials: 'include',
            body: JSON.stringify({title: 'Draft ' + Date.now()}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                return res.json()
            }).then(data => {
                const id = data.ad._id
                navigate('/ads/edit/' + id)
                // setAd(data.ad)
                // setLoading(false)
                return
            })
            .catch(e => {
                console.log(e)
            })
    }
    if (isAuth) {
        return (
            <div className={'container'}>
                <Menu server_host={server_host}/>
                <h1>Dashboard</h1>
                <div className="dash-board">
                    <div className="dashboard-ads">
                        <h2>Ads</h2>
                        <button className='dashboard-ads-link' onClick={createAdDraft}>Create ad</button>
                        <div>
                            {ads.map(ad => <DashboardAd key={ad.id} ad={ad} server_host={server_host}
                                                        deleteAd={deleteAd}/>)}
                        </div>
                    </div>
                    <div className="dash-board-sidebar">
                        <div className={'dashboard-form'}>
                            <div className="message">{message}</div>
                            <form>
                                <label>User name</label>
                                {/*<div className="message">{message}</div>*/}
                                <input type="text"
                                       value={user.username}
                                       onChange={(e) => getUserData('username', e.target.value)}/>
                                <label>Name</label>
                                <input type="text"
                                       value={user.name}
                                       onChange={(e) => getUserData('name', e.target.value)}/>
                                <label>Birthday</label>
                                <input type="date"
                                       value={user.birthday}
                                       onChange={(e) => getUserData('birthday', e.target.value)}/>
                                <label>About</label>
                                <textarea
                                    value={user.about}
                                    placeholder={'some words about yourself...'}
                                    onChange={(e) => getUserData('about', e.target.value)}/>
                                <button type={'button'} onClick={updateName} disabled={isDisabled}>Save</button>
                            </form>
                            {/*{user && JSON.stringify(user)}*/}
                            <div className={'dashboard-upload-ava'}>
                                <form onSubmit={submitAvatar}>
                                    <label>Upload avatar</label>
                                    <input type="file" onChange={e => setFiles(e.target.files)}/>
                                    <button type={'button'} disabled={files.length === 0}>Upload</button>
                                </form>
                                {progress && progress + '%'}
                            </div>
                        </div>
                        <div className='dash-board-gallery'>
                            {user.files && <Gallery server_host={server_host} user={user}/>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Dashboard;