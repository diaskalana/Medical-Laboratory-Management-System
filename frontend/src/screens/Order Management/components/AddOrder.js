import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddOrder() {
    const [formData, setFormData] = useState({
        date: '',
        company: '',
        destination: '',
        items: '',
        status: '',
    });
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8082/order/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('Order added successfully');
                navigate('/vieworders');
            } else {
                setStatus('Failed to add order');
            }
        } catch (error) {
            setStatus('Failed to connect to the server');
        }
    };

    return (
        <div className='container-fluid text-light m-5 mr-5'>
            <div className='container p-5' style={{ background: '#5AB7A6', borderRadius: 20 }}>
                <h1 className='mt-3'>Add Order</h1>
                <div className='container' style={{ borderRadius: 20 }}>

                    <form onSubmit={handleSubmit} className='text-start'>
                        <div className='row'>
                            <div className='col-6'>
                                <div className="form-group">
                                    <label htmlFor="date" className='text-left'>Date</label>
                                    <input type="date" className="form-control" id="date" onChange={handleChange} />
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="form-group">
                                    <label htmlFor="company">Company</label>
                                    <input type="text" className="form-control" id="company" placeholder="Enter Company Name" onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-6'>
                                <div className="form-group">
                                    <label htmlFor="destination">Destination</label>
                                    <input type="text" className="form-control" id="destination" placeholder="Enter Destination" onChange={handleChange} />
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="form-group">
                                    <label htmlFor="items">Items</label>
                                    <input type="number" className="form-control" id="items" placeholder="Enter Number of Items" onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="status">Status</label>
                            <input type="text" className="form-control" id="status" placeholder="Enter Status" onChange={handleChange} />
                        </div>
                        <button type="submit" className="btn col-3 mt-3 mb-5 btn-primary">Submit</button>
                    </form>
                    {status && <p>{status}</p>}
                </div>
            </div>
        </div>
    );
}
