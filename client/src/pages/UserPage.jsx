import React from 'react';
import Menu from "../components/Menu";
import '../index.css'

const Home = ({server_host}) => {
    return (
        <div className={'container'}>
            <Menu server_host={server_host} />
            <h1>Home page</h1>
        </div>
    );
};

export default Home;