import React, { useState } from 'react'
import './index.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Joi from 'joi';


export default function Register() {
    let navigate = useNavigate()
    const [errorList, setErrorList] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [apiError, setApiError] = useState('')
    const [user, setUser] = useState({
        "name": "",
        "username": "",
        "email": "",
        "phone": "",
        "password": ""
    })
    const joiPhoneValidate = Joi.extend(require("joi-phone-number"));

    function getUserData(event) {
        let myUser = { ...user };
        myUser[event.target.name] = event.target.value;
        // console.log(myUser);
        setUser(myUser)
    }

    async function sendDataToApi() {
        let { data } = await axios.post('https://', user)
        // console.log(data);
        if (data.message == 'success') {
            navigate('/login')
            setLoading(false)
        } else {
            setApiError(data.message)
            setLoading(false)
        }
    }

    function sumbitRegisterForm(e) {
        e.preventDefault();
        setLoading(true)
        let validation = validateForm()
        if (validation.error) {
            setErrorList(validation.error.details)
            setLoading(false)
        } else {
            sendDataToApi()
        }
        console.log(errorList);
    }

    function validateForm() {
        let scheme = Joi.object({
            name: Joi.string().min(3).max(10).required(),
            username: Joi.string().min(3).max(10).required(),
            email: Joi.string().email({ tlds: { allow: ['com', 'net'] } }).required(),
            phone: joiPhoneValidate.string().phoneNumber({format: "international",strict: true,defaultCountry: 'EG'}),
            password: Joi.string().pattern(/^[A-Z][a-z]{5,15}/).required(),
        })
        return scheme.validate(user, { abortEarly: false })
    }


    return (
        <div className='register-container w-50 mx-auto text-center'>

            <div className='w-50 mx-auto d-flex justify-content-center'>
                <img className='my-5' src={process.env.PUBLIC_URL + '/images/jumia logo2.png'} alt="" />
            </div>
            <h4>Welcome to Jumia</h4>
            <form onSubmit={sumbitRegisterForm} className='register-form w-75 mx-auto my-5'>
                <div className='my-4 input-box'>
                    <input onChange={getUserData} type="text"  name='name' id='name' className='form-control px-3 py-2' />
                    <span>Name</span>
                    {errorList.filter((error) => error.context.label == 'name')[0] ?
                        <div className='form-alert-msg my-2 py-1'>
                            {errorList.filter((error) => error.context.label == 'name')[0].message}
                        </div>
                        : ''
                    }
                </div>
                <div className='my-4 input-box'>
                    <input onChange={getUserData} type="text"  name='username' id='username' className='form-control px-3 py-2' />
                    <span>Username</span>
                    {errorList.filter((error) => error.context.label == 'username')[0] ?
                        <div className='form-alert-msg my-2 p-1'>
                            {errorList.filter((error) => error.context.label == 'username')[0].message}
                        </div>
                        : ''
                    }
                </div>
                <div className='my-4 input-box'>
                    <input onChange={getUserData} type="email"  name='email' id='email' className='form-control px-3 py-2' />
                    <span>Email</span>
                    {errorList.filter((error) => error.context.label == 'email')[0] ?
                        <div className='form-alert-msg my-2 p-1'>
                            {errorList.filter((error) => error.context.label == 'email')[0].message}
                        </div>
                        : ''
                    }
                </div>
                <div className='my-4 input-box'>
                    <input onChange={getUserData} type="tel"  name='phone' id='phone' className='form-control px-3 py-2' />
                    <span>Phone</span>
                    {errorList.filter((error) => error.context.label == 'phone')[0] ?
                        <div className='form-alert-msg my-2 p-1'>
                            {errorList.filter((error) => error.context.label == 'phone')[0].message}
                        </div>
                        : ''
                    }
                </div>
                <div className='my-4 input-box'>
                    <input onChange={getUserData} type="password"  name='password' id='password' className='form-control px-3 py-2' />
                    <span>Password</span>
                    {errorList.filter((error) => error.context.label == 'password')[0] ?
                        <div className='form-alert-msg my-2 p-1'>
                            {errorList.filter((error) => error.context.label == 'password')[0].message !== '"password" is not allowed to be empty' ? 'password is invalid please try again!' : '"password" is not allowed to be empty'}
                        </div>
                        : ''
                    }
                </div>
                <div className="my-5">
                    <button type='sumbit' className='continue form-control btn mt-3'>{isLoading == true ? <FontAwesomeIcon icon={faSpinner} className='spinner fs-3' /> : 'Create Account'}</button>
                </div>
                <div>
                    <p>For further support, you may visit the Help Center or contact our customer service team.</p>
                    <img className='' src={process.env.PUBLIC_URL + '/images/jumia logo1.png'} alt="" style={{ width: '130px' }} />
                </div>
                <p className='my-4'>Already a member ? <Link className='ms-2 log' to='/login'>Login</Link></p>
            </form>

        </div>
    )
}
