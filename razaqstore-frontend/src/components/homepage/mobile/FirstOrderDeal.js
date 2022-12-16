import React,{useState} from 'react'
import ExclusiveOffer from './ExclusiveOffer'
import {MdOutlineArrowForwardIos} from 'react-icons/md'
import './FirstOrderDeal.css'


const FirstOrderDeal = ()=>{
    return <div className="smallScreen-image-grid-wrapper">
        <article>
        <h2>First Order Deal for Newbies</h2>
            <MdOutlineArrowForwardIos className='arrowForward'/>
        </article>
        <ExclusiveOffer/>
    </div>
}
export default FirstOrderDeal