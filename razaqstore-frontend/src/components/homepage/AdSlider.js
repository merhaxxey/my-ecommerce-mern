import React from 'react'
import './AdSlider.css'

const AdSlider = ()=>{
    return <section className='ad-container'>
        <div className='ad-wrapper ad-wrapper1'>
            <img src={'http://localhost:3000/img1.jpg'} alt="" />
            <div className='adInfo adInfo1'>
                <span className='adStatement adStatement1'>Buy bulk products and get them at your door step</span>
                <button>Shop Now</button>
            </div>
        </div>
        <div className='ad-wrapper ad-wrapper2'>
            <img src={'http://localhost:3000/img2.jpg'} alt="" />
            <div className='adInfo adInfo2'>
                <span className='adStatement adStatement2'>Phone accessories at a giveaway price this Friday</span>
                <button>Shop Now</button>
            </div>
        </div>
        <div className='ad-wrapper ad-wrapper3'>
            <img src={'http://localhost:3000/img3.jpg'} alt="" />
            <div className='adInfo adInfo3'>
                <span className='adStatement adStatement3'></span>
                <button>Shop Now</button>
            </div>
        </div>
        <div className='ad-wrapper ad-wrapper4'>
            <img src={'http://localhost:3000/img4.jpg'} alt="" />
            <div className='adInfo adInfo4'>
                <span className='adStatement adStatement4'>Set your office with our laptop and phone collections</span>
                <button>Shop Now</button>
            </div>
        </div>
    </section>
}

export default AdSlider