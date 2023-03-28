import React, { useState, useContext } from 'react'
import Navbar from './Navbar'
import { AppContext } from './App';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import toast, { Toaster } from "react-hot-toast";

const Login = () => {

    const { setUserInfo } = useContext(AppContext);
    const navigate = useNavigate();
    const [formInfo, setFormInfo] = useState(
        {
            uid: "",
            pwd: ""
        }
    );

    const hanldeChange = (event) => {
        setFormInfo(prevForm => {
            return {
                ...prevForm,
                [event.target.name]: event.target.value
            }
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('uid', formInfo.uid);
        formData.append('pwd', formInfo.pwd);
        formData.append('submit', 'submit');

        const response = await fetch('http://localhost/bookstore/login.php', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        if (data.error) {
            toast.error(data.error)
        } else {
            toast.success(data.message)
            setTimeout(() => {
                setUserInfo(data.data);
                Cookies.set('session', JSON.stringify(data.data));
                navigate('/');
            }, 500);
        }

    };

    return (
        <div>
            <Toaster />
            <Navbar />
            <div className="container-fluid  py-5 home-bac">
                <h1 className='container'>
                    <span className='text-black-50'>Home</span> /
                    <span> Login</span>
                </h1>
            </div>
            <section className="container text-white my-5 log-w p-5 rounded" >
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Username/email</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" name="uid"
                            value={formInfo.uid} onChange={hanldeChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="pwd"
                            value={formInfo.pwd} onChange={hanldeChange} />
                    </div>
                    <button type="submit" className="btn btn-outline-success w-25 mt-3" name="submit">Login</button>
                </form>
            </section>
        </div>
    )
}

export default Login