import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../../../config/config';
import { authHeaders } from '../../../../config/axiosConfig';
import { useNavigate } from 'react-router-dom';
// import { FormControl, Input, InputLabel, TextField } from '@mui/material';


function AddProductForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        "title": '',
        "desc": '',
        "spec": '',
        "price": 0,
        "discount": 0,
        "brand": '',
        "stock": 0,
        "rating": 0,
        "category_id": null,
        "seller_id": null,
        "thumbnail": null,
        "images": []
    });
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        // Fetch brands when component mounts
        axios.get(`${baseURL}/api/products/get-brands`)
            .then(response => {
                setBrands(response.data);
            })
            .catch(error => {
                console.error('Error fetching brands:', error);
            });

        // Fetch categories when component mounts
        axios.get(`${baseURL}/api/categories`)
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    },
        []);

    const handleChange = (e) => {
        const { name, type } = e.target;

        if (type === 'file') {
            const files = Array.from(e.target.files);
            Promise.all(files.map(file => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = error => reject(error);
                });
            }))
                .then(images => {
                    setFormData({
                        ...formData,
                        [name]: images
                    });
                });
        } else {
            setFormData({
                ...formData,
                [name]: e.target.value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            for (const key in formData) {
                if (formData.hasOwnProperty(key)) {
                    if (key === 'images') {
                        formData[key].forEach((imageBase64, index) => {
                            formDataToSend.append(`${key}[${index}]`, imageBase64);
                        });
                    } else {
                        formDataToSend.append(key, formData[key]);
                    }
                }
            }

            await axios.post(`${baseURL}/api/products/add-product`, formDataToSend,
                { headers: authHeaders }
            );

            navigate('/dashboard/products')

            // Handle success, maybe show a success message or redirect
            console.log('Product added successfully');
        } catch (error) {
            console.error('Error adding product:', error);
            // Handle error, maybe show an error message
        }
    };

    return (
        // <FormControl>
        //     <InputLabel htmlFor="title">Title</InputLabel>
        //     <Input id="title" name="title" onChange={handleChange} />

        //     <InputLabel htmlFor="desc">Description</InputLabel>
        //     <TextField multiline
        //         rows={4}
        //         id="desc"
        //         name="desc"
        //         onChange={handleChange} />

        //     <InputLabel htmlFor="desc">Specifications</InputLabel>
        //     <TextField multiline
        //         rows={4}
        //         id="desc"
        //         name="desc"
        //         onChange={handleChange} />

        //     <InputLabel htmlFor="price">Price</InputLabel>
        //     <Input id="price" name="price" onChange={handleChange} />

        //     <InputLabel htmlFor="title">Title</InputLabel>
        //     <Input id="title" name="title" onChange={handleChange} />

        //     <InputLabel htmlFor="title">Title</InputLabel>
        //     <Input id="title" name="title" onChange={handleChange} />

        //     <InputLabel htmlFor="title">Title</InputLabel>
        //     <Input id="title" name="title" onChange={handleChange} />
        // </FormControl>
        <form onSubmit={handleSubmit} className="w-50 mx-auto my-5 ">
            <div className="row">
                <div className="col-6">
                    <div className='mb-2'>
                        <label className="form-label">Title</label>
                        <input type="text" name="title" onChange={handleChange} className="form-control" />

                    </div>
                    <div className='mb-2'>
                        <label className="form-label">
                            Description:</label>
                        <textarea name="desc" onChange={handleChange} className="form-control" />

                    </div>
                    <div className='mb-2'>
                        <label className="form-label">
                            Specification:</label>
                        <textarea name="spec" onChange={handleChange} className="form-control" />

                    </div>
                    <div className='mb-2'>
                        <label className="form-label">
                            Price: </label>
                        <input type="number" name="price" onChange={handleChange} className="form-control" />

                    </div>
                    <div className='mb-2'>
                        <label className="form-label">
                            Discount:</label>
                        <input type="number" name="discount" onChange={handleChange} className="form-control" />
                    </div>
                    <div className='mb-2'>
                        <label className="form-label">
                            Brand:</label>
                        <input type="text" name="brand" onChange={handleChange} className="form-control" />
                    </div>
                </div>
                <div className="col-6">
                    <div className='mb-2'>
                        <label className="form-label">
                            Stock:</label>
                        <input type="number" name="stock" onChange={handleChange} className="form-control" />

                    </div>
                    <div className='mb-2'>
                        <label className="form-label">
                            Rating:</label>
                        <input type="number" name="rating" onChange={handleChange} className="form-control" />

                    </div>
                    <div className='mb-2'>
                        <label className="form-label">
                            Category ID:</label>
                        {/* <input type="number" name="category_id" onChange={handleChange} className="form-control" /> */}
                        <select name="category_id" onChange={handleChange} className="form-select">
                            <option value="">Select category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>

                    </div>
                    <div className='mb-2'>
                        <label className="form-label">
                            Seller ID:</label>
                        <input type="number" name="seller_id" onChange={handleChange} className="form-control" />

                    </div>

                    <div className='mb-2'>
                        <label className="form-label">
                            Thumbnail:</label>
                        <input type="file" name="thumbnail" onChange={handleChange} className="form-control" />

                    </div>
                    <div className='mb-2'>
                        <label className="form-label">
                            Images (up to 5):</label>
                        <input type="file" name="images" onChange={handleChange} multiple className="form-control" />

                    </div>
                </div>


            </div>
            <button type="submit" className="btn btn-dark mt-3 w-100 ">Add Product</button>
        </form>
    );
}

export default AddProductForm;
