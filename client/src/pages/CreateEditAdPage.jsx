import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Menu from '../components/Menu';

const CreateEditAdPage = ({server_host}) => {

const params = useParams()
const navigate = useNavigate()

const [message, setMessage] = useState('')
const [title, setTitle] = useState(params.id ? 'Edit ad' : 'Create ad')
const [progress, setProgress] = useState()

    return (
        <div>
            <Menu server_host={server_host}/>
            <div className='container'>
                <h1>{title}</h1>
                <div className="message">{message}</div>
            </div>
        </div>
    );
};

export default CreateEditAdPage;