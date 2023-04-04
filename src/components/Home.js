import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import study from "../imgs/Study.png"
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const Home = () => {

    const [udata, setUdata] = useState(null);

    const getData = async () => {
        if (Cookies.get("session")) {
            const bytes = CryptoJS.AES.decrypt(Cookies.get("session"), process.env.REACT_APP_SECRET_KEY);
            const userData = bytes.toString(CryptoJS.enc.Utf8);
            //console.log(JSON.parse(userData));
            setUdata(JSON.parse(userData).name)
        }
    }

    useEffect(() => {
        getData()
    }, [udata])


    return (
        <div>
            <Navbar />
            <div className="container py-5">
                <div className="row d-flex align-items-center ">
                    <div className="col-lg-6 order-lg-1 order-2 text-lg-start text-center mt-lg-0 mt-5">
                        {udata && <h1 className='text-white'>Welcome {udata}</h1>}
                        <h1 style={{ color: "#FFEEA6" }}>Buy your favorite books</h1>
                        <p className='fs-2 mt-4' style={{ color: "#D7D7D7" }}>All your favorites book in one place, Buy any book, at home, on Office, or anywhere else</p>
                        <Link className='btn btn-light fs-2 px-4 mt-4' to="/Books">Get Started !</Link>
                    </div>
                    <div className="col-lg-6 order-lg-2 order-1">
                        <img src={study} alt="" className='img-fluid' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home