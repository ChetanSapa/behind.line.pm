import React from 'react';
import {NavLink} from "react-router-dom";

const Ad = ({server_host, ad, deleteAd, key}) => {
    console.log(ad.images)
    return (
        <div className='ad' key={key}>
            <div className="ad-fields">
                <div className="ad-left-side-fields">
                    <div className={'ad-field'}>
                        <span>Title</span>
                        {ad.title}
                    </div>
                    <div className={'ad-field'}>
                        <span>Text</span>
                        {ad.text}
                    </div>
                    <div className={'ad-field'}>
                        <span>Price</span>
                        {ad.price}
                    </div>
                    <div className={'ad-field-images'}>
                        <span>Images</span>
                        {ad.images && ad.images.map(i => <div>i</div>)}
                    </div>
                </div>
                <div className="ad-right-side-fields">
                    <div className={'ad-field'}>
                        <span>Category</span>
                        {ad.category}
                    </div>
                    <div className={'ad-field'}>
                        <span>Status</span>
                        {ad.published ? 'Published' : 'Publish'}
                    </div>
                </div>
            </div>
            <button type={"button"}><NavLink className={'nav-link'} to={'/ads/edit/' + ad._id}>Edit ad</NavLink></button>
            <button type={"button"} onClick={() => deleteAd(ad._id)}>Delete Ad</button>
        </div>
    );
};

export default Ad;