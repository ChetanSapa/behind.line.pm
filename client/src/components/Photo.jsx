import React, {useEffect, useState} from 'react';

const Photo = ({server_host, user, file}) => {
    const deletePhoto = () => {

        fetch(server_host + '/files/delete/id/' + file, {
            method: 'post',
            credentials: 'include'
        }).then(res => {
            return res.json()
        }).then(data => {
            console.log(data)
        }).catch(e => {
            console.log(e)
        })
    }

    return (
        <div className="gallery-list-item">
            {/*<img src={server_host + '/files/id/' + file} alt='Ava'/>*/}
            {/*/!*{file === user.avatar && 'Avatar'}*!/*/}
            {/*<button type={"button"} onClick={deletePhoto}>Delete photo</button>*/}
        </div>
    );
};

export default Photo;