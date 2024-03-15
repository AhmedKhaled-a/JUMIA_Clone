import React from 'react';
import logo from './imgs/logo2.png';
import './styles.css';
import logo1 from './imgs/jumia logo1.png'





function Login(){

    return(
        <div className='login  m-auto text-center'>
            <div>
                <img className='w-25' src={logo} alt="" />
            </div>
            <h4>Welcome to Jumia</h4>
            <p>Type your e-mail or phone number to log in or create a Jumia account.</p>
            <form action="" method="post">
                <input type="text" placeholder='Email or Mobile Number*' className='Email my-4 form-control' />
                <input type="submit" value="Continue" className='continue form-control btn mt-3' />
            </form>
            <p className='m-0'>By continuing you agree to Jumia’s</p>
            <p className='mb-4 '><a className='text-warning text-hover' href="">Terms and Conditions</a></p>
            <hr />
            <form action="" method="post">
                <input type="submit" value="Login With Passkeys" className='passkeys btn btn-outline-info form-control mt-3 mb-4' />
                <button type='submit' className='facebook btn btn-primary form-control'>
                <div className='me-5 d-flex justify-content-around mt-1'>
                <i class=" fa-brands fa-square-facebook"></i>
                <span>Login With Facebook </span>
                </div>
                    </button> 

           </form>
           <p className='mt-3'>For further support, you may visit the Help Center or contact our customer service team.</p>
           <img className='w-25' src={logo1} alt="" />
        </div>




    )
}
export default Login