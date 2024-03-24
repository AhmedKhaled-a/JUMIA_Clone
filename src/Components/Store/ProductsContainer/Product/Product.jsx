import React, { useEffect } from 'react'
import { storageURL } from '../../../../config/config'
import { Rating } from '@mui/material';
import { faHeart, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { cartDataSelector } from '../../../CartPage/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { theme } from '../../../../theme';
import { savedProductsDataSelector } from '../../savedProductsSlice';
import { userDataSelector } from '../../../../userSlice';


export default function Product(props) {
    const cart = useSelector(cartDataSelector);
    const productsCartCounts = cart.productsCount;
    const saved = useSelector(savedProductsDataSelector);
    const navigate = useNavigate();

    let { id, title, price, rating, thumbnail, stock, desc } = props.product;
    const userData = useSelector(userDataSelector);


    useEffect(() => {
        window.scrollTo(0,0);
    },[])
    return (
        <div className="product-card col-lg-3 col-md-4 col-sm-6 p-0" id={id}>
            <div class="product-image-container overflow-hidden">
                <Link to={`product/${id}`} >
                    <img className='w-100 product-image rounded-1' height="260" src={`${storageURL}${thumbnail}`} alt={desc} />
                </Link>
            </div>
            <div className="product-details p-2">
                <p className="product-title text-muted mb-1">{title}</p>
                <p className="product-price mb-1 fw-semibold">{price}$</p>
                <div className="d-flex align-items-center">
                    <Rating name="half-rating-read" readOnly value={Math.round(rating * 2) / 2} precision={0.5} />
                    {/* <p className='m-0 ms-1 text-muted'>({Math.round(rating * 2) / 2})</p> */}
                </div>
            </div>
            {props.isInCart(id) ?
                <div className=''>



                    {!userData.user ? '' : <div className="d-flex justify-content-between  align-items-center">
                        <div >
                            <button className='cart-counter-btn' onClick={() => { stock <= productsCartCounts[id] ? void (0) : props.changeInCart(id, 1) }} ><FontAwesomeIcon icon={faPlus} /></button>
                        </div>
                        <div className='px-5 fs-5'>

                            <p className='m-0'>{productsCartCounts[id]}</p>
                        </div>

                        <div >

                            <button className='cart-counter-btn' onClick={() => { productsCartCounts[id] <= 1 ? void (0) : props.changeInCart(id, -1) }} ><FontAwesomeIcon icon={faMinus} /></button>
                        </div>

                    </div>
                    }
                    {/* 
                    <div className="row">
                        <Link to="/cart">
                            <button className='bg-primary'>Go to Cart</button>
                        </Link>
                    </div> */}
                </div>
                :
                saved.error || !userData.user ? '' : <button className='add-cart-btn' onClick={() => { props.addCart(id) }}>Add to Cart</button>
            }
            {
                saved.error || !userData.user ? '' : <span className='save-icon' style={{ backgroundColor: theme.palette.primary.main }}>
                    {
                        props.isProductSaved(id) ? <BookmarkAddedIcon fontSize='small' onClick={() => { props.unsaveProduct(id) }} /> :
                            <BookmarkAddOutlinedIcon fontSize='small' onClick={() => { props.saveProduct(id) }} />
                    }
                </span>
            }
        </div>
    )
}
