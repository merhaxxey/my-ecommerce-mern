import React from 'react'
import {Link} from 'react-router-dom'
import { FaFacebookF } from "react-icons/fa";
import {BsTwitter} from "react-icons/bs";
import {GrInstagram} from "react-icons/gr"
import './Footer.css'

function Footer() {
  return (  
    <main className='footer-wrapper'>
        <div className='footer-part1'>
            <section className='footer-links'>
                <article className='links about-razaqStore'>
                    <h2>About razaqStore</h2>
                    <div className='link-wrapper'>
                        <Link to='/dummy'>Contact Us</Link>
                        <Link to='/dummy'>About Us</Link>
                        <Link to='/dummy'>Careers</Link>
                        <Link to='/dummy'>Our Blog</Link>
                        <Link to='/dummy'>Terms and Conditions</Link>
                    </div>
                </article>
                <article className='links'>
                    <h2>Buy on razaqStore</h2>
                    <div className='link-wrapper'>
                        <Link to='/dummy'>FAQ</Link>
                        <Link to='/dummy'>Delivery</Link>
                        <Link to='/dummy'>razaqStore Return</Link>
                        <Link to='/dummy'>Policy</Link>
                    </div>
                </article>
                <article className='links support'>
                    <h2>Support</h2>
                    <div className='link-wrapper'>
                        <Link to='/dummy'>Support Center</Link>
                        <Link to='/dummy'>Help Desk</Link>
                        <Link to='/dummy'>Phone Contact</Link>
                        <Link to='/dummy'>Whatsapp Contact</Link>
                    </div>
                </article> 
                <article className='links last-link-wrapper make-money'>
                    <h2>Make Money on razaqStore</h2>
                    <div className='link-wrapper'>
                        <Link to='/dummy'>Become an Affilate</Link>
                    </div>
                </article>
            </section>
            <form method='post' className='footer-productNews'>
                <p>Get notified about our latest products</p>
                <div className='field-wrapper'>
                    <input type="email" placeholder='Email address'/>
                    <button type='submit'>Subscribe</button>
                </div>
            </form>
        </div>
        <div className='footer-part2 footer-social-media-links'>
            <div>
                <p>Connect with us on</p>
                <Link className='first-link' to='/social-media'>
                    <FaFacebookF className='icon'/>
                </Link>
                <Link to='/social-media'>
                    <BsTwitter className='icon'/>
                </Link>
                <Link className='last-link' to='/social-media'>
                    <GrInstagram className='icon'/>
                </Link>
            </div>
        </div>
        <div className='footer-copyright'>
            <hr />
            <p>Copyright @ 2022 razaqStore.com. All right reserved</p>
            <hr />
        </div>
    </main>
  )
}

export default Footer