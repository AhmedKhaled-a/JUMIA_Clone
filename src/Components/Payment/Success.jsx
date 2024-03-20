import React, { useEffect, useState } from 'react';
import './style.css';
import axios from 'axios';

const Success = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const searchParams = new URLSearchParams(document.location.search)
        const sessionId = searchParams.get('session_id')
        console.log(sessionId);
    
        axios.get(`http://127.0.0.1:8000/api/success?session_id=${sessionId}`)
            .then(response => {
                setMessage(response.data.message);
            })
            .catch(error => {
                console.error('Error retrieving payment status:', error);
                setMessage('Error retrieving payment status. Please try again later.');
            });
    }, []);


    return (
        <div className='d-flex justify-content-center align-items-center mb-5 text-center'>
            <div className="card-success d-flex justify-content-center align-items-center flex-column">
                <div style={{ borderRadius: '200px', height: '200px', width: '200px', background: '#F8FAF5', margin: '0 auto' }} className='d-flex justify-content-center align-items-center'>
                    <i className="checkmark i-success">✓</i>
                </div>
                <h1 className='h1-success'>Success</h1>
                {/* <p className='p-success'>{message}</p> */}
                <p className='p-success'>Payment Successful</p>
            </div>
        </div>
    );
};

export default Success;