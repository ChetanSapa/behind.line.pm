import React, {useState} from 'react';
import Menu from "../components/Menu";
import validator from "email-validator";

const Login = () => {

    const [userData, setUserData] = useState({email: '', password: ''})
    const [message, setMessage] = useState('')

    const getUserData = (name, value) => {
        setUserData({
            ...userData,
            [name]: value
        })
        console.log(userData)
    }

    const logIn = () => {
        setMessage('')
        // setDisplay('none')
        if (!userData.email || !userData.password){
            // setDisplay('block')
            setMessage('Please fill all inputs')
            return
        }

        if (!validator.validate(userData.email)){
            // setDisplay('block')
            setMessage('Please enter a valid email address')
        }
    }

    return (
        <div className={'container'}>
            <Menu />
            <div className="signup-form">
                <h1>Log In</h1>
                <div className="message" >{message}</div>
                <form>
                    <input type="email" name={'email'} placeholder={'email...'}
                           onChange={(e)=> getUserData('email', e.target.value)} value={userData.email}/>
                    <input type="password" name={'password'} placeholder={'password...'}
                           onChange={(e)=> getUserData('password', e.target.value)} value={userData.password}/>
                    <button type={"button"} onClick={()=>logIn()}>
                        Log in
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;