import React, {useEffect, useState} from 'react';
import Photo from "./Photo";

const Gallery = ({server_host, user}) => {

    return (
        <div className={'gallery'}>
            <div className="gallery-list">
                {user.files.map(file =>
                    <Photo
                        key={file}
                        server_host={server_host}
                        user={user}
                        file={file}>
                    </Photo>)}
                {console.log(user.files)}
            </div>
        </div>
    );
};

export default Gallery;