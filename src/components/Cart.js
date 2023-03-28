import React, { useState, useContext, useEffect } from 'react'
import Navbar from './Navbar'
import { AppContext } from './App'
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { BsFillTrashFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";


const Cart = () => {


    const [currentItems, setCurrentItems] = useState(Cookies.get('allItems') ? JSON.parse(Cookies.get('allItems')) : [])
    const { setCountItems } = useContext(AppContext);
    const [total, setTotal] = useState(0);
    let currentUser = Cookies.get('session') ? Cookies.get('session') : null;
    const navigate = useNavigate();


    useEffect(() => {
        let count = 0;
        currentItems.forEach(element => {
            count += element.count
        });
        setCountItems(count);
        if (currentItems && count) {
            Cookies.set('cartItem', count);
        } else {
            Cookies.set('cartItem', 0);
        }
        subTotal();
    }, [currentItems])


    const handleIncrease = (id) => {
        const updatedItems = currentItems.map((item) => {
            if (item.b_id === id) {
                return {
                    ...item,
                    count: item.count + 1
                };
            }
            return item;
        });
        Cookies.set('allItems', JSON.stringify(updatedItems));
        setCurrentItems(updatedItems);
    };

    const handleDecrease = (id) => {
        const updatedItems = currentItems.map((item) => {
            if (item.b_id === id && item.count > 1) {
                return {
                    ...item,
                    count: item.count - 1
                };
            }
            return item;

        });
        Cookies.set('allItems', JSON.stringify(updatedItems));
        setCurrentItems(updatedItems);
    };

    const removeItem = (id) => {
        const updatedItems = currentItems.filter((item) => item.b_id !== id)
        Cookies.set('allItems', JSON.stringify(updatedItems));
        setCurrentItems(updatedItems);
    }

    const subTotal = () => {
        let total = 0;
        if (currentItems.length) {
            currentItems.map((item) => {
                total += (item.b_price * item.count);
            })
        }
        setTotal(total);
    }


    const handleClearAll = () => {
        Cookies.set('allItems', []);
        setCurrentItems([]);
    }

    const hanldeOrder = async () => {
        let id = JSON.parse(Cookies.get('session')).id;
        let price = parseFloat(total.toFixed(2));
        let status = 0;

        const formData = new FormData();
        formData.append('id', id);
        formData.append('price', price);
        formData.append('status', status);

        const response = await fetch('http://localhost/bookstore/order.php', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        if (data.error) {
            toast.error(data.error)
        } else {
            Cookies.set('allItems', []);
            Cookies.set('cartItem', 0);
            toast.success("Order has been sent")
            setTimeout(() => {
                navigate('/order');
            }, 500);
        }
    }

    return (
        <div>
            <Toaster />
            <Navbar />
            <div className="container-fluid  py-5 home-bac">
                <h1 className='container'>
                    <span className='text-black-50'>Home</span> /
                    <span> Cart</span>
                </h1>
            </div>
            <div className="container py-5 text-white">
                <div className="row text-center">
                    <div className="col-lg-3">
                        <h4 className='fw-normal'>Item</h4>
                    </div>
                    <div className="col-lg-3">
                        <h4 className='fw-normal'>Price</h4>
                    </div>
                    <div className="col-lg-3">
                        <h4 className='fw-normal'>Quantity</h4>
                    </div>
                    <div className="col-lg-3">
                        <h4 className='fw-normal'>Subtotal</h4>
                    </div>
                </div>
                <hr />

                {currentItems.length ? currentItems.map((items) => {
                    return (
                        <section key={items.b_id}>
                            <div className="row text-center py-2 d-flex align-items-center gap-lg-0 gap-3">
                                <div className="col-lg-3">
                                    <img className='img-fluid rounded w-25' src={items.b_img} alt="" />
                                    <h6 className='text-white mt-3 '>{items.b_name}</h6>
                                    <h6 className='text-white-50'>{items.b_author}</h6>
                                    <BsFillTrashFill className='text-danger' onClick={() => removeItem(items.b_id)} />
                                </div>
                                <div className="col-lg-3">
                                    <h5 className='fw-normal'>${items.b_price}</h5>
                                </div>
                                <div className="col-lg-3">
                                    <div className='d-flex gap-3 justify-content-center'>
                                        <button className='cart-buttons fs-3' onClick={() => handleDecrease(items.b_id)}>-</button>
                                        <h6 style={{ marginTop: "0.5rem" }} className="fs-3 fw-normal">{items.count}</h6>
                                        <button className='cart-buttons fs-3' onClick={() => handleIncrease(items.b_id)}>+</button>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <h5 className='fw-normal'>${parseFloat((items.b_price * items.count).toFixed(2))}</h5>
                                </div>
                            </div>
                            <hr />
                        </section>
                    )
                }) : <h1 className='text-center'>YOUR CART IS EMPTY</h1>}
                {currentItems.length ? <>
                    <div className='d-flex justify-content-center'>
                        <button className='btn btn-danger w-50' onClick={handleClearAll}>Clear Cart</button>
                    </div>
                    <div className='text-center my-5 p-5 border rounded'>
                        <h4>Subtotal: ${parseFloat(total.toFixed(2))}</h4>
                        {currentUser ? <button className='btn btn-primary mt-3'
                            onClick={hanldeOrder}>Confirm order</button> :
                            <Link className='btn btn-outline-danger mt-3'
                                to="/login">Login to Confirm order</Link>}
                    </div>
                </> : null}
            </div>
        </div>
    )
}

export default Cart