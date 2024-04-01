import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const ResetPasswordFieldsForUser = () => {
    const { remember_token } = useParams();
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== repeatPassword) {
            setResponseMessage('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8000/api/user/userResetPassword/${remember_token}`, { password });
            setResponseMessage(response.data.message);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='bg-light py-4 mb-5 w-50 mx-auto rounded d-flex justify-content-center align-items-center flex-wrap flex-column text-center'>
            <div className='w-75 mb-2 mx-auto'>
                <img src="https://my.jumia.com.eg/pictures/myjumia/myjumia-top-logo.png" alt="" className=' mb-2' style={{width: '100px'}}/>
                <h6 className='fw-bold'>Reset Your Password</h6>
                <small className='text-muted'>Enter your new password below. Make sure it's secure!</small>
            </div>
            <div className='w-50 mx-auto d-flex justify-content-center align-items-center flex-column'>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder='Enter new password' 
                        className='w-100 p-1' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input 
                        type="password" 
                        name="repeatPassword" 
                        id="repeatPassword" 
                        placeholder='Repeat new password' 
                        className='w-100 p-1 mt-3' 
                        value={repeatPassword} 
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        required
                    />
                    <input 
                        type="submit" 
                        value="Reset Password" 
                        className='btn mt-3 w-100 text-white' 
                        style={{backgroundColor: '#f68b2c', borderColor: '#f68b2c'}}
                    />
                </form>
                {responseMessage && <p>{responseMessage}</p>}
            </div>
        </div>
    );
};
