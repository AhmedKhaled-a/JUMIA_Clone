import React from 'react'
import { Link } from 'react-router-dom';

export default function VerificationSuccess() {
    return (
        <div className='d-flex justify-content-center align-items-center mb-5 text-center'>
            <div className="card-success d-flex justify-content-center align-items-center flex-column">
                <div style={{ borderRadius: '200px', height: '200px', width: '200px', background: '#F8FAF5', margin: '0 auto' }} className='d-flex justify-content-center align-items-center'>
                    <i className="checkmark i-success">✓</i>
                </div>
                <h1 className='h1-success'>Success</h1>
                {/* <p className='p-success'>{message}</p> */}
                <p className='p-success'>Verification Successful</p>
                <Link to="/login">Go To Login</Link>
            </div>
        </div>
    );
}
