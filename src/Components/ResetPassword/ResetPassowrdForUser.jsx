import axios from 'axios';
import React, { useState } from 'react';

export const ResetPassowrdForUser = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [responseCode, setResponseCode] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8000/api/user/foreget ', { email });
            setResponseMessage(response.data.message);
            setResponseCode(response.status);
        } catch (error) {
            console.error('Error:', error);
            setResponseCode(error.response ? error.response.status : null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='bg-light py-4 mb-5 w-50 mx-auto rounded d-flex justify-content-center align-items-center flex-wrap flex-column text-center'>
            <div className='w-75 mb-2 mx-auto'>
                <img src="https://my.jumia.com.eg/pictures/myjumia/myjumia-top-logo.png" alt="" className=' mb-2' style={{width: '100px'}}/>
                <h6 className='fw-bold'>Recover your password</h6>
                <small className='text-muted'>You can request a password reset below. We will send a reset link to the email address, please make sure it is correct.</small>
            </div>
            <div className='w-50 mx-auto d-flex justify-content-center align-items-center flex-column'>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder='Enter your email' 
                        className='w-100 p-1' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button 
                        type="submit" 
                        className='btn mt-3 w-100 text-white' 
                        style={{backgroundColor: '#f68b2c', borderColor: '#f68b2c'}}
                        disabled={loading} // Disable button when loading
                    >
                        {loading ? 'Loading...' : 'Request password reset'} {/* Change button text based on loading state */}
                    </button>
                </form>
                {responseMessage && <p style={{ color: responseCode === 200 ? 'green' : 'red' }}>{responseMessage}</p>} {/* Change paragraph color based on response code */}
            </div>
        </div>
    );
};
