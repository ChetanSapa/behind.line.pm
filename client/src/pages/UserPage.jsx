import React, {useEffect, useState} from 'react';
import Menu from "../components/Menu";
import '../index.css'
import {useParams} from "react-router-dom";
import Gallery from "../components/Gallery";

const UserPage = ({server_host}) => {

    const[user, setUser] = useState({ _id: "", email: "", username: "", role: "", birthday: "", name: "", about: "", avatar: {}, files: [] })
    const[loading, setLoading] = useState(true)

    useEffect(()=>{document.title = 'User page'},[])
    const params = useParams()
    console.log(params.id)
    useEffect(loadUser,[])

    function loadUser(){
        
        fetch(server_host + '/users/id/' + params.id,{
            credentials: 'include'
        }).then(res => {
            return res.json()
        }).then(data => {
            setLoading(false)
            setUser(data.user)
            console.log(data.user);
        }).catch(e => {
            console.error(e)
        })
    }

    if(loading){
        return <div className={'container'}><h1>loading</h1></div>
    }

    return (
        <div className={'container'}>
            <Menu server_host={server_host} />
            <h1>User</h1>
            <div className={'user-page'}>
                <div className={'user-page-desc'} key={user._id}>
                    <p>Id: {user._id}</p>
                    <p>Email: {user.email}</p>
                    <p>Role: {user.role}</p>
                    <p>System Name: {user.username}</p>
                    <p>Nikname: {user.name}</p>
                    <p>Birthday: {user.birthday}</p>
                    <p>About: {user.about}</p>
                </div>
                {user.avatar && <div className={'user-page-photo'}>
                    <img src={server_host + '/files/id/' + user.avatar} alt="Avatar"/>
                    <span>Avatar</span>
                </div>}
            </div>
            <div className="album">
                {/*{user.files.map(file =><div><img src={server_host + '/files/id/' + file} alt="" /></div> )}*/}
                {user.files && <Gallery server_host={server_host} user={user}/>}
            </div>
        </div>
    );
};

export default UserPage;