import React from 'react'
import Navbar from './Navbar'
import study from "../imgs/Study.png"
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <Navbar />
            <div className="container py-5">
                <div className="row d-flex align-items-center ">
                    <div className="col-lg-6 order-lg-1 order-2 text-lg-start text-center mt-lg-0 mt-5">
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