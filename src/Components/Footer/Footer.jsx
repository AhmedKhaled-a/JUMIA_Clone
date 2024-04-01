import React from 'react';
import './styles.css';
import logo from './imgs/jumia logo1.png';
import logoo from './imgs/logo2.png';
import payLogo from './imgs/pay logo.png'
import whiteLogo from './imgs/white logo.png'

function Footer() {
    return (
        <footer className="footer">
            <div className='first-section bg-dark'>
                <div className="container">
                    <div className="footer-columns row justify-content-around">
                        
                        <div className='text-white col-md-6 mt-4 p-5'>
                            <h6 className='mt-3'>New To JOYA?</h6>
                            <p>Subscribe to our newsletter to get updates on our latest offers!</p>
                            <form action="#" method="post">
                                <input className='form-control' placeholder=' Enter E-Mail Address' type="text" />
                            </form>
                            <div className='terms d-flex justify-content-between'>
                                <input className='check' type="checkbox" name="agree" id="agree" required />
                                <label className='agree my-3' htmlFor="agree" >I agree to Jumia's Privacy and Cookie Policy. You can unsubscribe from newsletters at any time. <br /></label>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
            {/* second section */}
            <div className="second-section text-white">
                <div className="container">

                    <div className="row">

                        <div className="col-md-3 mt-4 ">

                            <div className='links' >
                                <h6> NEED HELP ?</h6>
                                <ul >
                                    <li><a href="#">Chat with us</a></li>
                                    <li><a href="#">Help Center</a></li>
                                    <li><a href="#">Contact Us</a></li>
                                </ul>
                            </div>

                            <div>
                                <h6>USEFUL LINKS:</h6>
                                <ul>
                                    <li><a href="#">How To Shop On Jumia</a></li>
                                    <li><a href="#">How To pay On Jumia</a></li>
                                    <li><a href="#">Delivery Timelines</a></li>
                                    <li><a href="#">Dispute Resolution Policy</a></li>
                                    <li><a href="#">Return & Refund Policy</a></li>
                                    <li><a href="#">Payment Information Guidelines</a></li>
                                </ul>
                            </div>

                        </div>

                        <div className="links col-md-3 mt-4">
                            <h6>ABOUT JUMIA EGYPT</h6>
                            <ul>
                                <li><a href="#">Jumia Logistics Services</a></li>
                                <li><a href="#">Jumia Careers</a></li>
                                <li><a href="#">Terms and Conditions</a></li>
                                <li><a href="#">Stores Credit Terms & Conditions</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">Free Shipping</a></li>
                                <li><a href="#">Flash Sales</a></li>
                                <li><a href="#">Join the Jumia DA Academy</a></li>
                            </ul>
                        </div>

                        <div className="links col-md-3 mt-4">
                            <h6>MAKE MONEY WITH JUMIA</h6>
                            <ul>
                                <li><a href="#">Sell on Jumia</a></li>
                                <li><a href="#">Vendor Hub</a></li>
                                <li><a href="#">Become a Logistics Service Partner</a></li>
                                <li><a href="#">Become a Sales Consultant (J-Force )</a></li>
                            </ul>
                        </div>

                        <div className="col-md-3 mt-4">
                            <h6>JUMIA INTERNATIONAL</h6>

                            <div className=' d-flex'>
                                <div className='me-4'>
                                    <ul>
                                        <li><a href="#">Algeria</a></li>
                                        <li><a href="#">Ivory Coast</a></li>
                                        <li><a href="#">Ghana</a></li>
                                        <li><a href="#">Kenya</a></li>
                                        <li><a href="#">Morocco</a></li>
                                    </ul>
                                </div>


                                <div>
                                    <ul>
                                        <li><a href="#">Nigeria</a></li>
                                        <li><a href="#">Senegal</a></li>
                                        <li><a href="#">Tunisia</a></li>
                                        <li><a href="#">Uganda</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>




                        <div className="col-md-3 mt-3">
                            <h6>JOIN US ON</h6>
                            <a href=""><i className="me-4 fa-brands fa-facebook-f"></i></a>
                            <a href=""><i className="me-4 fa-brands fa-twitter"></i></a>
                            <a href=""><i className="me-4 fa-brands fa-instagram"></i></a>
                            <a href=""><i className="me-4 fa-brands fa-youtube"></i></a>
                        </div>

                        <div className="col-md-9 mt-3">
                            <h6>PAYMENT METHODS</h6>
                            <a href=""><i className="me-4 fa-solid fa-hand-holding-dollar"></i></a>
                            <a href=""><i className="me-4 fa-brands fa-cc-mastercard"></i></a>
                            <a href=""><i className="me-4 fa-brands fa-cc-visa"></i></a>
                            <a href=""><i className="me-4 fa-brands fa-cc-paypal"></i></a>
                        </div>

                        <div className="col-md-3 mt-3">

                            <div className=' d-flex'>
                                <div className='me-4'>
                                    <ul>
                                        <li><a href="#">Activ</a></li>
                                        <li><a href="#">ADIDAS</a></li>
                                        <li><a href="#">American Eagle</a></li>
                                        <li><a href="#">Andora</a></li>
                                    </ul>
                                </div>


                                <div className='ms-5'>
                                    <ul>
                                        <li><a href="#">Apple</a></li>
                                        <li><a href="#">Braun</a></li>
                                        <li><a href="#">Casio</a></li>
                                        <li><a href="#">Cottonil</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 mt-3">

                            <div className=' d-flex'>
                                <div className='me-4'>
                                    <ul>
                                        <li><a href="#">Defacto</a></li>
                                        <li><a href="#">Dejavu</a></li>
                                        <li><a href="#">Dice</a></li>
                                        <li><a href="#">Fresh</a></li>
                                    </ul>
                                </div>


                                <div className='ms-5'>
                                    <ul>
                                        <li><a href="#">Garnier</a></li>
                                        <li><a href="#">HP</a></li>
                                        <li><a href="#">Izor</a></li>
                                        <li><a href="#">Kady</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mt-3">

                            <div className=' d-flex'>
                                <div className='me-4'>
                                    <ul>
                                        <li><a href="#">L'Oreal Paris</a></li>
                                        <li><a href="#">LC Waikiki</a></li>
                                        <li><a href="#">Lenovo</a></li>
                                        <li><a href="#">Maybelline New York</a></li>
                                    </ul>
                                </div>


                                <div className='ms-5'>
                                    <ul>
                                        <li><a href="#">Mesery</a></li>
                                        <li><a href="#">Mothercare</a></li>
                                        <li><a href="#">NIVEA</a></li>
                                        <li><a href="#">Nokia</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mt-3">
                            <div className=' d-flex'>
                                <div className='me-4'>
                                    <ul>
                                        <li><a href="#">OPPO</a></li>
                                        <li><a href="#">Ravin</a></li>
                                        <li><a href="#">Samsung</a></li>
                                        <li><a href="#">SHEIN</a></li>
                                    </ul>
                                </div>
                                <div className='ms-5'>
                                    <ul>
                                        <li><a href="#">Sokany</a></li>
                                        <li><a href="#">Tornado</a></li>
                                        <li><a href="#">XIAOMI</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        

                    </div>

                </div>

            </div>

        </footer>
    );
}

export default Footer;
