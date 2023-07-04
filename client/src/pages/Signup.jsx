import React, {useState} from 'react';
import Menu from "../components/Menu";
import validator from "email-validator";

const Signup = () => {

    const [userData, setUserData] = useState({email: '', password: ''})
    const [pass, setPass] = useState('')
    const [message, setMessage] = useState('')

    const getUserData = (name, value) => {
        setUserData({
            ...userData,
            [name]: value
        })
    }

    const  signUp = async () => {
        setMessage('')
        if (!userData.email || !userData.password || !pass){
            setMessage('Please fill all inputs')
            return
        }
        if (userData.password !== pass){
            setMessage('Password mismatch')
            return;
        }
        if (!validator.validate(userData.email)){
            setMessage('Please enter a valid email address')
        }

        const res = await fetch('http://localhost:9001/users/signup', {
            method: 'post',
            credentials: 'include',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        setUserData({email: '', password: ''})
        setPass('')
        const data = await res.json()

        if (data.data) {
            setMessage('Registration done')
        } else {
            setMessage(`${data.message}`)
        }
    }


    return (
        <div className={'container'}>
            <Menu />
            <div className="signup-form">
                <h1>Sign Up</h1>
                <div className={'message'} style={{display: `block`}}>{message}</div>
                <form>
                        <input type="email" name={'email'} placeholder={'email...'}
                               onChange={(e)=> getUserData('email', e.target.value)} value={userData.email} />
                        <input type="password" name={'password'} placeholder={'password...'}
                               onChange={(e)=> getUserData('password', e.target.value)} value={userData.password} />
                        <input type="password" name={'password'} placeholder={'password again...'}
                               onChange={(e)=> setPass( e.target.value)} value={pass} />
                        <button type={"button"} onClick={()=> signUp()}>
                            Sign Up
                        </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;