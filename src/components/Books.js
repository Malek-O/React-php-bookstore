import Navbar from './Navbar'
import React, { useContext, useState, useEffect } from "react";
import { AppContext } from './App'
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const Books = () => {



    const { noItems, setNoItems, countItems, setCountItems } = useContext(AppContext);
    const [bookItems, setBookItems] = useState({});
    const [books, setBooks] = useState([]);

    useEffect(() => {
        books.map((item) => {
            return (
                setBookItems(prevItems => ({
                    ...prevItems,
                    [item.b_id]: 0
                }))
            );
        })
    }, [])


    useEffect(() => {
        let count = 0;
        noItems.forEach(element => {
            count += element.count
        });
        setCountItems(count);
        if (noItems && count) {
            Cookies.set('cartItem', count);
            const encryptedData = CryptoJS.AES.encrypt(
                JSON.stringify(noItems),
                process.env.REACT_APP_SECRET_KEY
            ).toString();
            Cookies.set('allItems', encryptedData);
            setNoItems([])
        }
    }, [noItems])

    useEffect(() => {
        fetch('https://mybook-1.000webhostapp.com/getBooks.php')
            .then(response => response.json())
            .then(data => setBooks(data));
    }, [])


    const handleAddToCart = () => {
        let updatedCart = []
        let count = 0;
        Object.keys(bookItems).forEach(key => {
            updatedCart = [...updatedCart, {
                ...books[count],
                count: bookItems[key]
            }];
            count++
        });
        setNoItems(updatedCart.filter((item) => item.count > 0));
    }

    const handleIncrease = (id) => {
        setBookItems(prevItems => ({
            ...prevItems,
            [id]: (prevItems[id] || 0) + 1
        }));
    };

    const handleDecrease = (id) => {
        setBookItems(prevItems => ({
            ...prevItems,
            [id]: (prevItems[id] || 1) - 1
        }));
    };


    console.log(noItems);
    return (
        <div>
            <Navbar />
            <div className="container-fluid  py-5 home-bac">
                <h1 className='container'>
                    <span className='text-black-50'>Home</span> /
                    <span> Products</span>
                </h1>
            </div>
            <div className="container">
                <div className="row d-flex ">
                    {books.length ? books.map((item) => {
                        const count = bookItems[item.b_id] || 0;
                        return (
                            <div key={item.b_id} className="col-lg-3 col-md-6 d-flex flex-column align-items-lg-start align-items-center  py-5">
                                <img className='img-fluid rounded w-50' src={item.b_img} alt="" />
                                <h6 className='text-white mt-3 w-75 text-lg-start text-center'>{item.b_name}</h6>
                                <h6 className='text-white-50'>{item.b_author} </h6>
                                <p className='text-white'>${item.b_price}</p>
                                <div className='d-flex bg-light  p-2 rounded'>
                                    <button className='btn btn-success me-2' onClick={() => handleAddToCart()}>Add to Cart</button>
                                    <div className='d-flex  align-items-center gap-2'>
                                        <button className='cart-buttons' onClick={() => handleDecrease(item.b_id)}>-</button>
                                        <h6 style={{ marginTop: "0.5rem" }}>{count}</h6>
                                        <button className='cart-buttons' onClick={() => handleIncrease(item.b_id)}>+</button>
                                    </div>
                                </div>
                            </div>
                        );
                    }) : <h1 className='text-white py-5'>Loading...</h1>}
                </div>
            </div>
        </div>
    )
}

export default Books