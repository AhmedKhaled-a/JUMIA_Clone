import Joi from "joi";
import React, { useState } from "react";
import logo from './imgs/sellerCenter.png';

const SellerLoginForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});

    const schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).required().label("Email"),
        password: Joi.string().min(6).required().label("Password")
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { error } = schema.validate(formData, { abortEarly: false });

        if (error) {
            const newErrors = {};
            error.details.forEach((detail) => {
                newErrors[detail.path[0]] = detail.message;
            });
            setErrors(newErrors);
        } else {
            setErrors({});
            // Handle form submission here
            console.log("Form submitted:", formData);
        }
    };

    return (
        <main className="cd__main">
            <script src="https://use.fontawesome.com/f59bcd8580.js"></script>
            <div className="container">
                <div className="row m-5 no-gutters shadow-lg">
                    <div className="col-md-6 d-none d-md-flex justify-content-center align-items-center">
                        <img src={logo} className="col-12" style={{ maxWidth: "100%" }} alt="Seller Center" />
                    </div>
                    <div className="col-md-6 bg-white p-5">
                        <h3 className="pb-3 fw-light">
                            <strong>SELLER</strong> CENTER
                        </h3>
                        <div className="form-style">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group pb-3">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && <small className="text-danger">{errors.email}</small>}
                                </div>
                                <div className="form-group pb-2">
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    {errors.password && <small className="text-danger">{errors.password}</small>}
                                </div>
                                <div className="d-flex align-items-center justify-content-between mb-2">
                                    <div>
                                        <a href="#">
                                            <small>Forget Password?</small>
                                        </a>
                                    </div>
                                </div>
                                <div className="pb-2">
                                    <button type="submit" className="btn w-100 font-weight-bold mt-2 submit" onClick={handleSubmit}>
                                        Log In
                                    </button>
                                </div>
                            </form>
                            <div className="pt-4 text-center">
                                Don't have an account? <a href="#">Sign Up</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default SellerLoginForm;
