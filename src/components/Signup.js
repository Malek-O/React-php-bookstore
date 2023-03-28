import React, { useState, useEffect } from "react";
import Navbar from './Navbar';
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const navigate = useNavigate();
    const [formInfo, setFormInfo] = useState(
        {
            uid: "",
            email: "",
            pwd: "",
            pwdrepeat: "",
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
        formData.append('email', formInfo.email);
        formData.append('pwd', formInfo.pwd);
        formData.append('pwdrepeat', formInfo.pwdrepeat);
        formData.append('submit', 'submit');

        const response = await fetch('http://localhost/bookstore/signup.php', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        if (data.error) {
            toast.error(data.error)
        } else {
            toast.success(data.message)
            setTimeout(() => {
                navigate('/login');
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
                    <span> Signup</span>
                </h1>
            </div>
            <section className="container text-white log-w my-5 p-5  rounded" >
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control" name="uid"
                            value={formInfo.uid} onChange={hanldeChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" name="email"
                            value={formInfo.email} onChange={hanldeChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" name="pwd"
                            value={formInfo.pwd} onChange={hanldeChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Repeat Password</label>
                        <input type="password" className="form-control" name="pwdrepeat"
                            value={formInfo.pwdrepeat} onChange={hanldeChange} />
                    </div>
                    <button type="submit" className="btn btn-outline-success w-25" name="submit"
                    >Sign up</button>
                </form>
            </section>

        </div>
    )
}

export default Signup