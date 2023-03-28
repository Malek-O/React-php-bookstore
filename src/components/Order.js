import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Cookies from 'js-cookie';

const Order = () => {

    const [orderData, setOrderData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrderData = async () => {
        let id = JSON.parse(Cookies.get('session')).id;
        const formData = new FormData();
        formData.append('id', id);

        const response = await fetch('http://localhost/bookstore/getOrder.php', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        if (data.error) {
            setLoading(false)
        } else {
            setTimeout(() => {
                setOrderData(data)
                setLoading(false)
            }, 500);
        }
    }

    useEffect(() => {
        fetchOrderData();
    }, [])

    return (
        <div>
            <Navbar />
            <div className="container-fluid  py-5 home-bac">
                <h1 className='container'>
                    <span className='text-black-50'>Home</span> /
                    <span> Orders</span>
                </h1>
            </div>
            {!loading ?
                <div className='container text-white py-5'>
                    {orderData.length ?
                        <div className="table-responsive">
                            <table className="table table-bordered ">
                                <thead className="table-dark">
                                    <tr>
                                        <th>ORDER_ID</th>
                                        <th>ORDER_PRICE</th>
                                        <th>ORDER_STATUS</th>
                                        <th>ORDER_DATE</th>
                                    </tr>

                                </thead>
                                <tbody className="table-light">
                                    {orderData.map((item) => {
                                        return (
                                            <tr key={item.o_id} className="fs-5">
                                                <td>{item.o_id}</td>
                                                <td>${item.o_price}</td>
                                                <td>{item.o_status == 1 ? <h5 className='confirmed'>Confirmed</h5> : <h5 className='pending'>Pending</h5>}</td>
                                                <td>{item.date}</td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>
                        </div> : <h1 className='text-white text-center py-5'>You dont have orders yet !</h1>}

                </div> : <h1 className='text-white text-center py-5'>Loading...</h1>}
        </div>
    )
}

export default Order