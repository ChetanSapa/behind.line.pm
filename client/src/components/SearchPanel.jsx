import React from 'react';



const SearchPanel = ({server_host, setUsers}) => {


    const search = (value) => {
        console.log(value)
            fetch(server_host + '/users/search?about=' + value + '&name=' + value, {
                method: 'get',
                credentials: 'include',
            }).then(res => {
                // console.log(res)
                return res.json()
            }).then(data => {
                console.log(data)
                setUsers(data.data)
            })
        }

        return (
        <div className={'search-panel'}>
            <input type="text" placeholder={'Search by name & about'} onChange={e => search(e.target.value)}/>
        </div>
    );
};

export default SearchPanel;