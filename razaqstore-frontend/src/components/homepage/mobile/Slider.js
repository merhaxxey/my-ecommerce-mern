import React,{useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getProduct} from '../../../features/product/productSlice'
import {imgLinks} from '../../../productAdsImg'
import './Slider.css'

let isDragging = false,
    startPos = 0,
    currentTranslate = 0,
    prevTranslate = 0,
    lastSlidePrevTranslate = 0,
    animationID = 0,
    active = 0,
    productImages = [],
    circleWidth = 0,
    fullscreen = window.innerWidth,
    fullPictureWidth = 0;

const Slider = ()=>{
    const {windowWidth} = useSelector((store)=> store.home)
    const [loading, setLoading] = useState(true)
    const [imageToDisplay, setImageToDisplay] = useState([])
    const productImageRef = React.useRef(null)
    const imageWrapperRef = React.useRef(null)
    const radarRef = React.useRef(null)

    useEffect(()=>{
        setImageToDisplay(imgLinks)
    }, [])

    useEffect(()=>{
        productImages = Array.from(productImageRef.current.children)

        const radarWidth = radarRef.current.clientWidth
        const imageSize = productImageRef.current.children.length
        circleWidth = (1 / imageSize) * radarWidth
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
        if(windowWidth>466){
            fullPictureWidth = productImages[1].clientWidth
            const result = (fullscreen - fullPictureWidth)/2
            if(active===0){   
                currentTranslate = 0
            }
            else if(active===1){
                currentTranslate = -(fullPictureWidth - result)
            }
            else if(active>1 && active<productImages.length-1){
                currentTranslate = -((fullPictureWidth - result) + ((active-1) * (fullscreen - (result + result) )))
            }
            else{
                const fullLastPictureWidth = productImages[productImages.length-1].clientWidth

                const lastSlideScreenRem = fullscreen - fullLastPictureWidth
                const half = (fullscreen - fullLastPictureWidth)/2
                const translate = fullscreen - (lastSlideScreenRem + half)

                if(lastSlidePrevTranslate === 0){
                    currentTranslate = -(Math.abs(prevTranslate) + translate - 3)
                    lastSlidePrevTranslate = currentTranslate
                }

                currentTranslate = lastSlidePrevTranslate
            }

        }
        if(windowWidth<=466){
            currentTranslate = active * -window.innerWidth
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
            ?e.pageX
            :e.touches[0].clientX
    }

    return <main className='mobile-homepage-slider'>
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
                    <img src={image} className={`image ${index===0 && 'first-image-slide'} ${index === imageToDisplay.length-1 && 'last-image-slide'}`} alt="product image" />
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