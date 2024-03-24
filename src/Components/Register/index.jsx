import React, { useState } from 'react'
import './index.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Joi from 'joi';
import { baseURL } from "../../config/config";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { TextField } from '@mui/material';





export default function Register() {
    let navigate = useNavigate()
    const [errorList, setErrorList] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [apiError, setApiError] = useState('')
    const [user, setUser] = useState({
        "fullname": "",
        "username": "",
        "email": "",
        "password": "",
        "gender": "female",
        "phone_number": "",
        "address_country": "Egypt",
        "address_city": "",
        "address_district": "",
    })
    const joiPhoneValidate = Joi.extend(require("joi-phone-number"));

    function getUserData(event) {
        let myUser = { ...user };
        myUser[event.target.name] = event.target.value;
        // console.log(myUser);
        setUser(myUser)
    }

    async function sendDataToApi() {
        console.log(user);
        // hash password using bcrypt
        // user.password = await new Promise((resolve, reject) => {
        //     bcrypt.hash(user.password, 10, function (err, hash) {
        //         if (err) reject(err)
        //         resolve(hash)
        //     });
        // })

        let { data } = await axios.post(`${baseURL}/api/users/register`, user)
        // console.log(data);
        if (data.code == 0) { // 0 ==>  no error code
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
            fullname: Joi.string().min(3).max(10).required(),
            username: Joi.string().min(3).max(10).required(),
            email: Joi.string().email({ tlds: { allow: ['com', 'net'] } }).required(),
            phone_number: joiPhoneValidate.string().phoneNumber({ format: "international", strict: true, defaultCountry: 'EG' }),
            password: Joi.string().pattern(/^([A-Z]|[a-z]|[0-9]){5,15}/).required(),
            gender: Joi.string().valid("male", "female").required(),
            address_country: Joi.string().required(),
            address_city: Joi.string().required(),
            address_district: Joi.string().required(),
        })
        return scheme.validate(user, { abortEarly: false })
    }


    return (
        <div className='register-container w-50 mx-auto text-center'>

            <div className='w-50 mx-auto d-flex justify-content-center'>
                <img className='my-5' src={process.env.PUBLIC_URL + '/images/logo/Joya2.png'} alt="" />
            </div>
            <h4>Welcome to JOYA</h4>
            <form onSubmit={sumbitRegisterForm} className='register-form w-75 mx-auto my-5'>
                <div className='my-4 input-box'>
                    <TextField label="Name" variant="standard" onChange={getUserData} type="text" name='fullname' id='fullname' className='w-100' />
                    {/* <input onChange={getUserData} type="text" name='fullname' id='fullname' className='form-control px-3 py-2' /> */}
                    {/* <span>Name</span> */}
                    {errorList.filter((error) => error.context.label == 'fullname')[0] ?
                        <div className='form-alert-msg my-2 py-1'>
                            {errorList.filter((error) => error.context.label == 'fullname')[0].message}
                        </div>
                        : ''
                    }
                </div>
                <div className='my-4 input-box'>
                    <TextField label="Username" variant="standard" onChange={getUserData} type="text" name='username' id='username' className='w-100' />
                    {/* <input onChange={getUserData} type="text" name='username' id='username' className='form-control px-3 py-2' />
                    <span>Username</span> */}
                    {errorList.filter((error) => error.context.label == 'username')[0] ?
                        <div className='form-alert-msg my-2 p-1'>
                            {errorList.filter((error) => error.context.label == 'username')[0].message}
                        </div>
                        : ''
                    }
                </div>
                <div className='my-4 input-box'>
                    <TextField label="Email" variant="standard" onChange={getUserData} type="email" name='email' id='email' className='w-100' />
                    {/* <input onChange={getUserData} type="email" name='email' id='email' className='form-control px-3 py-2' />
                    <span>Email</span> */}
                    {errorList.filter((error) => error.context.label == 'email')[0] ?
                        <div className='form-alert-msg my-2 p-1'>
                            {errorList.filter((error) => error.context.label == 'email')[0].message}
                        </div>
                        : ''
                    }
                </div>
                <div className='my-4 input-box'>
                    <TextField  label="Phone number" variant="standard" onChange={getUserData} type="tel" name='phone_number' id='phone_number' className='w-100' />
                    {/* <input onChange={getUserData} type="tel" name='phone_number' id='phone_number' className='form-control px-3 py-2' />
                    <span>Phone</span> */}
                    {errorList.filter((error) => error.context.label == 'phone_number')[0] ?
                        <div className='form-alert-msg my-2 p-1'>
                            {errorList.filter((error) => error.context.label == 'phone_number')[0].message}
                        </div>
                        : ''
                    }
                </div>
                <div className='my-4 input-box'>
                    <TextField label="Password" variant="standard" onChange={getUserData} type="password" name='password' id='password' className='w-100' />

                    {/* <input onChange={getUserData} type="password" name='password' id='password' className='form-control px-3 py-2' />
                    <span>Password</span> */}
                    {errorList.filter((error) => error.context.label == 'password')[0] ?
                        <div className='form-alert-msg my-2 p-1'>
                            {errorList.filter((error) => error.context.label == 'password')[0].message !== '"password" is not allowed to be empty' ? 'password is invalid please try again!' : '"password" is not allowed to be empty'}
                        </div>
                        : ''
                    }
                </div>

                <FormControl fullWidth sx={{ marginBottom: "18px" }}>
                    <InputLabel id="address_countryLB">Country</InputLabel>
                    <Select
                        variant='standard'
                        labelId="address_countryLB"
                        id="address_country"
                        name="address_country"
                        value="Egypt"
                        defaultValue="Egypt"
                        label="Country"
                        disabled
                    >
                        <MenuItem value={"Egypt"} selected={true}>Egypt</MenuItem>
                        <MenuItem value={"Palestine"}>Phalestine</MenuItem>
                        <MenuItem value={"UAE"}>UAE</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ marginBottom: "18px" }}>
                    <InputLabel id="address_cityLB">City</InputLabel>
                    <Select
                        variant='standard'
                        required
                        labelId="address_cityLB"
                        id="address_city"
                        name="address_city"
                        value={user?.address_city}
                        label="Country"
                        onChange={(e) => { console.log(e.target.value); setUser({ ...user, address_city: e.target.value }); }}
                    >
                        <MenuItem value={"Alexandria"} selected>Alexandria</MenuItem>
                        <MenuItem value={"Cairo"}>Cairo</MenuItem>
                        <MenuItem value={"Mansoura"}>El Mansoura</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ marginBottom: "28px" }}>
                    <InputLabel id="address_countryLB">District</InputLabel>
                    <Select
                        required
                        variant='standard'
                        sx={{ padding: '1px' }}
                        labelId="address_countryLB"
                        id="address_district"
                        name="address_district"
                        label="District"
                        value={user?.address_district}
                        onChange={(e) => { console.log(e.target.value); setUser({ ...user, address_district: e.target.value }); }}
                    >
                        <MenuItem value={"Bab Sharq"} selected>Bab Sharq</MenuItem>
                        <MenuItem value={"Moharam Bik"}>Moharam Bik</MenuItem>
                        <MenuItem value={"El Manshia"}>El Manshia</MenuItem>
                    </Select>
                </FormControl>

                <FormControl>
                    <FormLabel id="genderLB">Gender</FormLabel>
                    <RadioGroup
                        aria-labelledby="genderLB"
                        defaultValue="female"
                        name="gender"
                        id="gender"
                        onChange={(e) => { console.log(e.target.value); setUser({ ...user, gender: e.target.value }); }}
                    >
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                    </RadioGroup>
                </FormControl>

                <div className="my-5">
                    <button type='sumbit' className='continue form-control btn mt-3'>{isLoading == true ? <FontAwesomeIcon icon={faSpinner} className='spinner fs-3' /> : 'Create Account'}</button>
                </div>
                <div>
                <p>For further support, you may visit the <span><a href="$" className='fw-bold orange-hover'>Help Center</a></span> or contact our customer service team.</p>
                </div>
                <p className='my-4'>Already a member ? <Link className='ms-2 log' to='/login'>Login <span><img className='small-img' src={process.env.PUBLIC_URL + '/images/logo/Joya2.png'} alt="" /></span></Link></p>
            </form>

        </div>
    )
}
