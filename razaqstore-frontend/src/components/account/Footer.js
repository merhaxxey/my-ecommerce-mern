import React from 'react'
import {Link} from 'react-router-dom'
import './Footer.css'

const Footer = ()=>{
    return <section className='accountFooter-wrapper'>
        <div className='accountFooter-sub-wrapper'>
            <Link to='/'>Terms and conditions</Link>
            <Link id='policy' to='/'>Policy</Link>
            <Link to='/'>help desk</Link>
        </div>
        <p id='copyright'>Copyright @ 2022 razaqstore.com. All right reserved</p>
    </section>
}
export default Footer