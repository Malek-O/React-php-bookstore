import React, { useContext } from 'react'
import Logo2 from "../imgs/Logo1.png"
import { BsCart4 } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { AppContext } from './App'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import '../App.css';


const Navbar = () => {

    const { countItems } = useContext(AppContext);
    const navigate = useNavigate();

    let currentCount = Cookies.get('cartItem') ? Cookies.get('cartItem') : null;
    let currentUser = Cookies.get('session') ? Cookies.get('session') : null;

    const handlClick = () => {
        navigate('/login');
        Cookies.remove('session');
    }

    console.log(currentUser && JSON.parse(currentUser).val !== 1);
    return (
        <nav className="navbar navbar-expand-lg  navbar-dark p-4 nav-bac">
            <div className="container">
                <Link className="navbar-brand" href="#" to="/" >
                    <img src={Logo2} className="" width="50" height="50" alt="" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        {currentUser && JSON.parse(currentUser).val === 0 || !currentUser ?
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link fs-5" aria-current="page" to="/">Home</Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link fs-5" aria-current="page" to="/Books">Prodcuts</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link fs-5" aria-current="page" to="/">About</Link>
                                </li>
                            </>
                            : <>
                                <li className="nav-item">
                                    <Link className="nav-link fs-5" aria-current="page" to="/Books">Users</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link fs-5" aria-current="page" to="/">All Orders</Link>
                                </li>
                            </>
                        }

                    </ul>
                    {currentUser ? <>
                        {currentUser && JSON.parse(currentUser).val === 0 ?
                            <>
                                <Link type="button" className="btn btn-outline-success me-3" to="/order">Orders</Link>
                                <Link type="button" className="btn btn-outline-danger" to="/signup"
                                    onClick={handlClick}>Logout</Link>
                            </>
                            : <>
                                <Link type="button" className="btn btn-outline-danger" to="/signup"
                                    onClick={handlClick}>Logout</Link>
                            </>}

                    </> : <>
                        <Link type="button" className="btn btn-outline-primary me-3" to="/login">Login</Link>
                        <Link type="button" className="btn btn-outline-light" to="/signup">Signup</Link>
                    </>}
                    {((currentUser && JSON.parse(currentUser).val !== 1) || !currentUser) &&
                        <div className='text-white ms-lg-4 mt-lg-0 mt-3 fs-5 cart-x'>
                            <Link href="#" className='text-white' to="/cart"><BsCart4 className='cart-l' /></Link>
                            <h6>{currentCount ? currentCount : countItems}</h6>
                        </div>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar