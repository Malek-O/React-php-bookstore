import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Cookies from 'js-cookie';

const Users = () => {
    return (
        <div>
            <Navbar />
            <div className="container-fluid  py-5 home-bac">
                <h1 className='container'>
                    <span className='text-black-50'>Home</span> /
                    <span> Users</span>
                </h1>
            </div>
        </div>
    )
}

export default Users