import React from 'react'
import {exclusiveOffer} from '../../../productAdsImg'
import {Link} from 'react-router-dom'

function ExclusiveOffer() {
  return (
    <div className='smallScreen-image-grid'>
        {exclusiveOffer.map((item , index)=>{
            return <Link to='exclusive-offer' className='image-wrapper'>
                <span className='discount'>-99%</span>
                <img src={item.img} alt='image' />
                <p>&#8358;{item.price*0.01}</p>
            </Link>
        })}
    </div>
  )
}

export default ExclusiveOffer