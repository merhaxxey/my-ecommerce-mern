import React,{useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {getProduct} from '../../../features/product/productSlice'
import './Slider.css'

let isDragging = false,
    startPos = 0,
    currentTranslate = 0,
    prevTranslate = 0,
    animationID = 0,
    active = 0,
    productImages = [],
    circleWidth = 0
    
const Slider = ()=>{
    const {product} = useSelector((store)=> store.product)
    const {windowWidth} = useSelector((store)=> store.home)
    const [loading, setLoading] = useState(true)
    const [imageToDisplay, setImageToDisplay] = useState([])
    const productImageRef = React.useRef(null)
    const imageWrapperRef = React.useRef(null)
    const radarRef = React.useRef(null)
    const [radarCircleTranslate, setRadarCircleTranslate] = useState(0)

    useEffect(()=>{
        setImageToDisplay(product.img)
    }, [product])

    useEffect(()=>{
        productImages = Array.from(productImageRef.current.children)

        const radarWidth = radarRef.current.clientWidth
        const imageSize = productImageRef.current.children.length
        circleWidth = (1 / imageSize) * radarWidth
        console.log(productImageRef)
    })


    function touchStart(e){
        isDragging = true
        startPos = getPositionX(e)
        animationID = requestAnimationFrame(animation)
    }

    function touchMove(e){
        if(isDragging){
            const currentPosition = getPositionX(e)
            currentTranslate = prevTranslate + currentPosition - startPos
        }
    }
    function touchEnd(e){
        isDragging = false
        cancelAnimationFrame(animationID)
        
        const movedBy = currentTranslate - prevTranslate
        
        if(movedBy < -100 && active < productImageRef.current.children.length-1){
            const circleWidth = radarRef.current.children[0].clientWidth
            active+=1
        } 
        if(movedBy > 100 && active > 0){
            active-=1
        } 

        setPositionByIndex()
    }

    function setPositionByIndex(){
        if(imageWrapperRef?.current === undefined) return
        currentTranslate = active * -imageWrapperRef?.current.clientWidth
        
        if(windowWidth>466){
            if(active === productImageRef.current.children.length - 1){
                const spaceLeft = window.innerWidth - imageWrapperRef.current.clientWidth
                currentTranslate = (Math.abs(currentTranslate) - imageWrapperRef.current.clientWidth)
                currentTranslate = -(currentTranslate + (imageWrapperRef.current.clientWidth - spaceLeft))
            }
        }

        prevTranslate = currentTranslate
        setSliderPosition()
        radarRef.current.children[0].style.transform = `translateX(${active * circleWidth}px)`
    }
    function animation(){
        setSliderPosition()
        if(isDragging){
            requestAnimationFrame(animation)
        }
    }
    function setSliderPosition(){
        productImageRef.current.style.transform = `translateX(${currentTranslate}px)`
    }
    function getPositionX(e){
        return e.type.includes('mouse')
            ?e.pagex
            :e.touches[0].clientX
    }
    return <main className='mobile-product-slider'>
        <section ref={productImageRef} className='product-image-slider'>
            {imageToDisplay.map((image, index)=>{
                return <article 
                    onMouseUp={touchEnd}
                    onMouseDown={touchStart}
                    onMouseLeave={touchEnd}
                    onMouseOver={touchMove}
                    
                    onTouchStart={touchStart}
                    onTouchEnd={touchEnd}
                    onTouchMove={touchMove}
                    
                    className='image-wrapper'
                    ref={imageWrapperRef}
                >
                    <img src={image} className='image' alt="product image" />
                </article>
            })}
            
        </section>
        <div 
            style={{top: `${productImageRef.current?.clientHeight - 10}px`}}
            ref={radarRef}
            id='radar'
        >
            <span style={{width:`${circleWidth}px`}} className='circle'></span>
        </div>
    </main>
}
export default Slider