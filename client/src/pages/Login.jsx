import React, {useState} from 'react';
import Menu from "../components/Menu";
import validator from "email-validator";
import {useNavigate} from "react-router-dom";

const Login = ({server_host}) => {

    const [userData, setUserData] = useState({email: '', password: ''})
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const getUserData = (name, value) => {
        setUserData({
            ...userData,
            [name]: value
        })
    }

    const logIn = async () => {
        setMessage('')
        if (!userData.email || !userData.password) {
            setMessage('Please fill all inputs')
            return
        }

        if (!validator.validate(userData.email)) {
            setMessage('Please enter a valid email address')
            return
        }
        const res = await fetch(server_host + '/users/login', {
            method: 'post',
            credentials: 'include',
            body: JSON.stringify(userData),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const data = await res.json()
        if (data.ok){
            setMessage(data.message)
            navigate('/dashboard')
        }else {
            setMessage(data.message)
        }
    }

    return (
        <div className={'container'}>
            <Menu server_host={server_host} />
            <div className="signup-form">
                <h1>Log In</h1>
                <div className="message">{message}</div>
                <form>
                    <input type="email" name={'email'} placeholder={'email...'}
                           onChange={(e) => getUserData('email', e.target.value)} value={userData.email}/>
                    <input type="password" name={'password'} placeholder={'password...'}
                           onChange={(e) => getUserData('password', e.target.value)} value={userData.password}/>
                    <button type={"button"} onClick={() => logIn()}>
                        Log in
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;