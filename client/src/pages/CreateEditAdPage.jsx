import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import Menu from '../components/Menu';
import Photo from '../components/Photo';

const CreateEditAdPage = ({server_host}) => {

    let {id} = useParams()
    const navigate = useNavigate()

    const [message, setMessage] = useState('')
    const [title, setTitle] = useState(id ? 'Edit Ad' : 'Create Ad')
    const [progress, setProgress] = useState(0)
    const [ad, setAd] = useState({})
    const [disabled, setDisabled] = useState(false)
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadAd()
        setLoading(false)
    }, [loading])

    function uploadImg(file) {

    }

    const saveAd = async (ad) => {
        setMessage('')
        setDisabled(true)
        console.log(ad)
        if (!ad.category || ad.category === 'select category') {
            setMessage('Choose category')
            setDisabled(true)
            return
        }
        try {
            const res = await fetch(server_host + '/ads/update', {
                method: 'post',
                credentials: "include",
                body: JSON.stringify(ad),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json()
            if (data.ok) {
                console.log(data.ad)
                setMessage('Saved')
            } else {
                setMessage('Something went wrong')
                setDisabled(false)
            }

        } catch (e) {
            console.log(e)
            setMessage(e)
            setDisabled(false)
        }

    }
    const loadAd = () => {
        fetch(server_host + '/ads/id/' + id, {
            method: 'get',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                setAd(data.ad)
                setLoading(false)
                console.log(data.ad)
            })

    }
    const deleteAd = (ad) => {

    }

    const changeAd = (key, value) => {

        setMessage('')
        setDisabled(false)

        if (key === 'price') {
            setAd({
                ...ad,
                [key]: parseInt(value)
            })
            return
        }
        if (key === 'images') {
            setAd({
                ...ad,
                [key]: ad.images ? ad.images.concat({id: value}) : {id: value}
            })
            return
        }

        setAd({
            ...ad,
            [key]: value
        })
    }

    if (loading) {
        return <div className='container'>
            <Menu server_host={server_host}/>
            <h1>Loading...</h1>
        </div>
    }
    return (
        <div>
            <div className='container'>
                <Menu server_host={server_host}/>
                <h1>{title}</h1>
                <div className="message">{message}</div>
                <div>{JSON.stringify(ad)}</div>
                <div className="create-ad-form-container">
                    <form className="create-ad-form">
                        <div className={"create-ad-form-item"}>
                            <span>Title</span>
                            <input type="text" onChange={e => changeAd('title', e.target.value)} value={ad.title}/>
                        </div>
                        <div className={"create-ad-form-item"}>
                            <span>Text</span>
                            <input type="text" onChange={e => changeAd('text', e.target.value)} value={ad.text}/>
                        </div>
                        <div className={"create-ad-form-item"}>
                            <span>Category</span>
                            <select onChange={e => changeAd('category', e.target.value)}
                                    defaultValue={ad.category ? ad.category : 'select category'}>
                                <option value={'select category'} disabled={true}>select category</option>
                                <option value={'work'}>work</option>
                                <option value={'rent'}>rent</option>
                            </select>
                        </div>
                        <div className={"create-ad-form-item"}>
                            <span>Price</span>
                            <input type="number" onChange={e => changeAd('price', e.target.value)} value={ad.price}/>
                        </div>
                        <div className={"create-ad-form-item"}>
                            <span>Published</span>
                            <input type="checkbox" onChange={e => changeAd('published', e.target.checked)}
                                   value={ad.published}/> show on site
                        </div>
                        <div className={"create-ad-form-item"}>
                            <span>Ad photo</span>
                            <input type="file" onChange={e => uploadImg(e.target.files[0])} disabled={disabled}/>
                        </div>
                        <div className="progress">
                            {progress && progress + '%'}
                        </div>
                        <div>
                            {ad.images && ad.images.map(i => <Photo key={i} server_host={server_host} user={user}
                                                                    file={i}/>)}
                        </div>
                        <button type='button' onClick={() => saveAd(ad)} disabled={disabled}>Save ad</button>
                        &nbsp;
                        <button type='button' onClick={deleteAd} disabled={disabled}>Delete ad</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateEditAdPage;