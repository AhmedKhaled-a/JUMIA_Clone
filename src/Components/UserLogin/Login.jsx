import { useState, React, useContext } from 'react'
import './styles.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Joi from 'joi';
import { baseURL } from '../../config/config';
import { setTokenAction, setTypeAction, setUserAction } from '../../userSlice';
import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';


// every user type will have a login page


function Login() {
    // let {userData,setUserData} = useContext(UserDataContext);

    // const userData = useSelector(userDataSelector);
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        "email": "",
        "password": ""
    })

    function getUserData(event) {
        let myUser = { ...user };
        myUser[event.target.name] = event.target.value;
        // console.log(myUser);
        setUser(myUser);
    }


    let navigate = useNavigate();
    const [errorList, setErrorList] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [apiError, setApiError] = useState('');


    async function sendLoginDataToApi() {
        // console.log(user);
        let res = await axios.post(`${baseURL}/api/auth/user/login`, user).catch(err => {
            console.log(err);
            setApiError(err.response.data.error);
            setLoading(false);

        })

        if (res) {
            console.log(res.data);
            let data = res.data;
            if (data.token) {
                localStorage.setItem('userToken', data.token);
                localStorage.setItem('userType', 'user');
                dispatch(setUserAction(data.user));
                dispatch(setTypeAction('user'));
                dispatch(setTokenAction(data.token));
                navigate('/')
            } else {
                setLoading(false)
            }
        }
        else {
            setLoading(false);
        }
    }

    function sumbitLoginForm(e) {
        e.preventDefault();
        setLoading(true)
        let validation = validateForm()
        if (validation.error) {
            setErrorList(validation.error.details)
            setLoading(false)
        } else {
            sendLoginDataToApi()
        }
        // console.log(errorList);
    }

    function validateForm() {
        let scheme = Joi.object({
            email: Joi.string().email({ tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string().pattern(/^([A-Z]|[a-z]|[0-9]){5,15}/).required(),
        })
        return scheme.validate(user, { abortEarly: false })
    }

    return (
        <div className='login-container w-50 mx-auto text-center'>
            <div className='w-50 mx-auto d-flex justify-content-center'>
                <img className='mb-4' src={process.env.PUBLIC_URL + '/images/logo/Joya2.png'} alt="" />
            </div>
            <h4>Welcome to JOYA</h4>
            <p>Type your e-mail or phone number to log in or create a JOYA account.</p>
            <form onSubmit={sumbitLoginForm} className='Login-form w-75 mx-auto my-5'>
                <div className='my-4 input-box'>
                <TextField  label="Email" variant="standard" onChange={getUserData} type="email" name='email' id='email'  className='w-100'/>

                    {/* <input onChange={getUserData} type="email" name='email' id='email' className='form-control px-3 py-2' /> */}
                    {/* <span>Email</span> */}
                    {errorList.filter((error) => error.context.label == 'email')[0] ?
                        <div className='form-alert-msg my-2 p-1'>
                            {errorList.filter((error) => error.context.label == 'email')[0].message}
                        </div>
                        : ''
                    }
                </div>
                <div className='my-4 input-box'>
                <TextField  label="Password" variant="standard" onChange={getUserData} type="password" name='password' id='password' className='w-100'/>
                    {/* <input onChange={getUserData} type="password" name='password' id='password' className='form-control px-3 py-2' />
                    <span>Password</span> */}
                    {errorList.filter((error) => error.context.label == 'password')[0] ?
                        <div className='form-alert-msg my-2 p-1'>
                            {errorList.filter((error) => error.context.label == 'password')[0].message !== '"password" is not allowed to be empty' ? 'password is invalid please try again!' : '"password" is not allowed to be empty'}
                        </div>
                        : ''
                    }

                    {apiError ? <div className='form-alert-msg my-2 p-1'>
                            {apiError}
                        </div>
                        : ''
                    }
                </div>
                <div className='text-start'><a href="/reset-password/request" className='mt-3 orange-hover'>Forgot password?</a></div>
                <div className="my-5">
                    <button type='sumbit' className='continue form-control btn mt-3'>{isLoading == true ? <FontAwesomeIcon icon={faSpinner} className='spinner fs-3' /> : 'Login'}</button>
                </div>
                <p className='my-4'>New to JOYA ? <Link className='ms-2 log' to='/register'>Register</Link></p>

                <div>
                    <p>For further support, you may visit the <span><a href="$" className='fw-bold orange-hover'>Help Center</a></span> or contact our customer service team.</p>
                    {/* <img className='' src={process.env.PUBLIC_URL + '/images/logo/Joya2.png'} alt="" style={{ width: '130px' }} /> */}
                </div>
            </form>

        </div>




    )
}
export default Login