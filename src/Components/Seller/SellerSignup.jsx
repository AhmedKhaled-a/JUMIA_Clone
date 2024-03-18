import React, { useState }  from "react";
import logo from "./imgs/logo2.png";
import './css/checkbox.css';
import Joi from "joi";

const SellerForm = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        repeatPassword: '',
        shop_name: '',
        phone_number: '',
        termsAgreed: false,
    });
    
        const [errors, setErrors] = useState({});
        
        const schema = Joi.object({
            fullname: Joi.string().min(3).max(50).required(),
            email: Joi.string().email({ tlds: false }).required(),
            password: Joi.string()
            .min(8)
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]+$/)
            .required()
            .messages({
            'string.min': 'Password must be at least 8 characters long',
            'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, and one special character',
            'any.required': 'Password is required',
            }),
            repeatPassword: Joi.string().valid(Joi.ref('password')).required()
            .label('Confirm Password')
            .messages({ 'any.only': 'Passwords must match' }),
            shop_name: Joi.string().min(3).max(50).required(),
            phone_number: Joi.string().pattern(/^[0-9]{11}$/).required().messages({
                "string.pattern.base": "Phone number must be exactly 11 digits long",
                "any.required": "Phone number is required",
            }),
            termsAgreed: Joi.boolean().valid(true).required().messages({
            'any.only': 'You must agree to the terms of service',
            'any.required': 'You must agree to the terms of service',
            }),
    });
    
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === "checkbox" ? checked : value;
    
        // Update form data
        setFormData({ ...formData, [name]: val });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validate entire form data
        const validation = schema.validate(formData, { abortEarly: false });
    
        if (validation.error) {
          const newErrors = {};
          for (const err of validation.error.details) {
            newErrors[err.path[0]] = err.message;
          }
          setErrors(newErrors);
          return;
        }
    
        setErrors({});
    
        // Create a copy of formData excluding the repeatPassword field
        const { repeatPassword, ...formDataWithoutRepeatPassword } = formData;

        console.log(formDataWithoutRepeatPassword);
    
        try {
          const response = await fetch("/api/sellers/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formDataWithoutRepeatPassword),
          });
    
          if (!response.ok) {
            throw new Error("Failed to register seller");
          }
    
          console.log("Seller registered successfully!");
        } catch (error) {
          console.error("Error registering seller:", error.message);
        }
      };
    
          

    return (
        <section className="my-4">
        <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="">
                <div className="card text-black" style={{ borderRadius: 25 }}>
                <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                    <div className="col-12 col-lg-9">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <img src={logo} alt="" classNameName="w-50" />
                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                            Sign up
                            <small style={{ color: "#f68b1e" }}> VendorCenter</small>
                            </p>
                        </div>

                        <form className="mx-1 mx-md-4">
                        {/* ---------- Full Name ---------- */}
                        <div className="form-floating mb-3">
                            <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="your name"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            />
                            <label for="floatingInput">Your name</label>
                            {errors.fullname && <small className="text-danger">{errors.fullname}</small>}
                        </div>

                        {/* ---------- Email ---------- */}
                        <div className="form-floating mb-3">
                            <input
                            type="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            />
                            <label for="floatingInput">Email address</label>
                            {errors.email && <small className="text-danger">{errors.email}</small>}
                        </div>

                        {/* ---------- Password ---------- */}
                        <div className="form-floating mb-3">
                            <input
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            />
                            <label for="floatingPassword">Password</label>
                            {errors.password && <small className="text-danger">{errors.password}</small>}
                        </div>

                        {/* ---------- Repeat Password ---------- */}
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="floatingPassword"
                                placeholder="Repeat Password"
                                name="repeatPassword"
                                value={formData.repeatPassword}
                                onChange={handleChange}
                            />
                            <label for="floatingPassword">Repeat Password</label>
                            {errors.repeatPassword && <small className="text-danger">{errors.repeatPassword}</small>}
                        </div>

                        {/* ---------- Shop Name ---------- */}
                        <div className="form-floating mb-3">
                            <input
                            type="text"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="your shop name"
                            name="shop_name"
                            value={formData.shop_name}
                            onChange={handleChange}
                            />
                            <label for="floatingPassword">Shop name</label>
                            {errors.shop_name && <small className="text-danger">{errors.shop_name}</small>}
                        </div>

                        {/* ---------- Phone Number ---------- */}
                        <div className="form-floating mb-3">
                            <input
                            type="tel"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="your phone number"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            />
                            <label for="floatingPassword">Phone number</label>
                            {errors.phone_number && <small className="text-danger">{errors.phone_number}</small>}
                        </div>

                        {/* ---------- Temrs ---------- */}
                        <div className="form-check custom-checkbox">
                            <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                            name="termsAgreed"
                            checked={formData.termsAgreed}
                            onChange={handleChange}
                            />
                            <label className="form-check-label" for="flexCheckDefault">
                                I agree all statements in Terms of service *
                            </label>
                            <br />
                            {errors.termsAgreed && <small className="text-danger">{errors.termsAgreed}</small>}
                        </div>

                        {/* ---------- Submit ---------- */}
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button type="submit" className="btn fs-5 fw-bold w-75 mt-3 p-2 submit" onClick={handleSubmit}>
                                Sign up
                            </button>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
    );
}

export default SellerForm;
