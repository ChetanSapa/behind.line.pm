import React, { useState } from 'react';
import Menu from '../components/Menu';
import { NavLink, useParams } from 'react-router-dom';
import Ad from '../components/Ad';

const AdsListPage = ({server_host}) => {
    const params = useParams()
    const [ads, setAds] = useState([{id: 1}, {id: 2}])
    return (
        <div className={'container'}>
            <Menu server_host={server_host} />
            <h1>Ads</h1>
            <div className='ads_list_category'>
                <div><NavLink to={'/ads/category/all'}>All</NavLink></div>
                <div><NavLink to={'/ads/category/auto'}>Auto</NavLink></div>
                <div><NavLink to={'/ads/category/properties'}>Properties</NavLink></div>
            </div>
            <div>
                {ads.map(ad => <Ad server_host={server_host} ad={ad} key={ad.id}/>)}
            </div>
        </div>
    );
};

export default AdsListPage;