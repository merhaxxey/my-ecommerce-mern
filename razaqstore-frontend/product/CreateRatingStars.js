import React,{useState, useEffect} from 'react'
import {MdStar, MdStarHalf, MdStarOutline} from 'react-icons/md'

const CreateRatingStars = ({productRating})=>{
    const value = (productRating - Math.floor(productRating)).toFixed(1) > 0.4? 1: 0
    const [isFractionNumber, setIsFractionNumber] = useState(value)
    const [stars, setStars] = useState([])
    useEffect(()=>{
        let starsTemp = []
        let i = 0
        while(i<(Math.floor(productRating)) ){
            starsTemp.push(1)
            i++
        }
        // console.log('value  ', value)
        // console.log('isFractionNumber  ', isFractionNumber)
        if(isFractionNumber===1){
            i++;
            starsTemp.push(0)
        }
        for(i = i;i<5; i++){
            starsTemp.push(2)
        }
        
        setStars(starsTemp)
    }, [])

    return <span className='stars-wrapper'>{stars.map((item, index)=>{
        if(index===0 && item===1){
            return <MdStar className='star first-star'/>
        }
        if(item===1){
            return <MdStar className='star'/>
        }
        if(item===0){
            return <MdStarHalf className='star'/>
        }
        return <MdStarOutline className='star'/>
    })}</span>
}

export default CreateRatingStars