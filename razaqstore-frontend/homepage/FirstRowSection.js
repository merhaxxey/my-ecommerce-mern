import React, {useState, useEffect, useRef} from 'react'
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import {imgLinks} from '../../productAdsImg'
import {MdArrowBackIosNew} from 'react-icons/md'
import {MdOutlineArrowForwardIos} from 'react-icons/md'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import SubCategory from './SubCategory'
import RightSideView from './FirstRowSection_Files/RightSideView';
import {visualCategory} from '../../visualCategory'
import VisualCategory from './mobile/VisualCategory'
import {setFirstRowSectionWidth, setWindowWidth, setSubCategoryIndex, setOpenSubCategory} from '../../features/home/homeSlice';
import {useDispatch, useSelector} from 'react-redux'
import {newCustomerOffer} from '../../newCustomerOffer'
import './FirstRowSection.css'

//redux

const FirstRowSection = ()=>{
    const {categories, firstRowSectionWidth, subCategoryIndex, windowWidth, openSubCategory} = useSelector((store)=> store.home)
    const dispatch = useDispatch()
    const [visualCategories, setVisualCategories] = useState(visualCategory)
    const slideWrapper = useRef(null)
    const [adsLinks, setAdsLinks] = useState(imgLinks)
    const [index, setIndex] = useState(0)
    const slideRef = useRef(null)
    const [newCustomerOfferIndex, setNewCustomerOfferIndex] = useState(0)
    const [displayBtns, setDisplayBtns] = useState(true)
    const [productAds_ArrowIconTouched, setProductAds_ArrowIconTouched] = useState(false)
    const [domListIsNull, setDomListIsNull] = useState(false)
    const [disableLargeScreenSlide, setDisableLargeScreenSlide] = useState(false)
    const [slideProductAds, setSlideProductAds] = useState('firstSlide')
    const [isSlideProductAdsChanged, setIsSlideProductAdsChanged] = useState(0)
    const [scrollSlideWidths, setScrollSlideWidths] = useState({})  
    const [currentPostionOfSlide, setCurrentPostionOfSlide] = useState('translateX(0px)')

    console.log(firstRowSectionWidth)

    const handleProductAdsHover = (e)=>{
        const result = e.target.classList.contains('slideRadar-wrapper') || e.target.classList.contains('slideRadar') || e.target.classList.contains('productAdsImgs')|| e.target.classList.contains('prev') || e.target.classList.contains('next') || e.target.classList.contains('arrowNewIcon')
        if(result){
            setDisplayBtns(true)
        }
        else if(e.target.classList.value===''){
            setDomListIsNull(true)
        }
        else{
            setDisplayBtns(false)
        }  

    }  
    // this part is for listing and removing sub-category
    const handleCategoriesListing = (index)=>{
        dispatch(setSubCategoryIndex(index))
        dispatch(setOpenSubCategory(true))
    }
    const removeSubCategoriesListing = (e)=>{
        const result = e.target.classList.contains('category') || e.target.classList.contains('subCategories-h3') || e.target.classList.contains('subCategories-li') || e.target.classList.contains('sub-categories') || e.target.classList.contains('sub-categories-article') || e.target.classList.contains('sub-categories-ul') || e.target.classList.contains('subCategories-h3-a') || e.target.classList.contains('subCategories-li-a')
        if(!result){
            dispatch(setOpenSubCategory(false))
        }
    }


    // this is to check the window screen size
    const changeWindowWidth = ()=>{
        dispatch(setWindowWidth())
        const value = slideWrapper.current?.clientWidth
        dispatch(setFirstRowSectionWidth(value))
    }   
    useEffect(()=>{
        const value = slideWrapper.current?.clientWidth
        if(firstRowSectionWidth===0) dispatch(setFirstRowSectionWidth(value))

        window.addEventListener('resize', changeWindowWidth)
        return ()=> window.removeEventListener('resize', changeWindowWidth)
    }) 

    useEffect(()=>{
        if(!disableLargeScreenSlide) return

        let timeInMS = 3000
        const timer = setInterval(()=>{
            setIndex(index+1)
        }, timeInMS)
        return ()=> clearInterval(timer)
    }, [index])

    useEffect(()=>{
        if(!disableLargeScreenSlide) return

        if(index>=adsLinks.length) return

        setIsSlideProductAdsChanged(index)
        if(index===0){
            return setSlideProductAds('firstSlide')
        }
        if(index===1){
            return setSlideProductAds('secondSlide')
        }
        if(index===(adsLinks.length-1)){
            return setSlideProductAds('lastSlide')
        }
        setSlideProductAds('otherSlides')
    }, [index])

    //useEffect for both large and small screen
    //this controls indexing on the images
    useEffect(()=>{
        const lastIndex = adsLinks.length-1

        if(index<0){
            setIndex(lastIndex)
        }
        else if(index > lastIndex){
            setIndex(0)
        }
    },[index, adsLinks] )
    
    //useEffects for large screen transitions
    useEffect(()=>{
        if(!disableLargeScreenSlide){
            console.log('useEffects for large screen transitions')
            const productAds_ArrowIconTouchedHandle = ()=>{
                if(productAds_ArrowIconTouched && domListIsNull){
                    setDisplayBtns(true)
                }else{
                    setDisplayBtns(false)
                }
            }

            productAds_ArrowIconTouchedHandle()
        }

    }, [domListIsNull])


    useEffect(()=>{
        if(!disableLargeScreenSlide){
            const timer = setInterval(()=>{
            setIndex(index + 1)
            }, 5000)  
            return ()=>{
            clearInterval(timer)
            }
        }
    }, [index])

    useEffect(()=>{ 

        if(!disableLargeScreenSlide){
            const lastIndex = newCustomerOffer.length-1

            if(newCustomerOfferIndex<0){
            setNewCustomerOfferIndex(lastIndex)
            }
            else if(newCustomerOfferIndex>lastIndex){
            setNewCustomerOfferIndex(0)
            }
        }
    }, [newCustomerOfferIndex])
    useEffect(()=>{

        if(!disableLargeScreenSlide){
            const timer = setInterval(()=>{
            setNewCustomerOfferIndex(newCustomerOfferIndex+1)
            }, 10000)
            return ()=>{
            clearInterval(timer)
            }
        }
    }, [newCustomerOfferIndex])

    return <main className='homepage'>
        <div 
            ref={slideWrapper} 
            className="homepage-view1" 
            onMouseOver={(e)=> {
                handleProductAdsHover(e)
                removeSubCategoriesListing(e)
            }}
        >
            <section className="categories">
                <h2><ListOutlinedIcon className="categoriesIcon"/> Categories</h2>
                {categories.map((item, index)=>{
                return <a href={`/categories/${index+1}`} className="category" >{item.icon}{item.name}</a>
                })}
            </section> 

            {/* categories items listing on hovering */}
            {openSubCategory && <SubCategory openSubCategory={openSubCategory} />}

            <section className="middle-of-view1">

            <div ref={slideRef}  className={`${slideProductAds} productAds`}>
                {adsLinks.map((item, loopIndex)=> {
                    let position = 'nextSlide'
                    if(loopIndex === index){
                    position = 'activeSlide'
                    }
                    if(loopIndex === index-1 || (index===0 && loopIndex===adsLinks.length-1)){
                    position = 'lastSlide'
                    }
                    return <img className={`${position} productAdsImgs ${loopIndex===0 &&'firstImageSlide' } ${(loopIndex===adsLinks.length-1) && 'lastImageSlide'}`} src={item} alt="ads" />
                })}
                { displayBtns && <>
                    <button onClick={()=> setIndex(index-1)} 
                    className="prev"
                    >
                    <MdArrowBackIosNew onMouseOver={()=> setProductAds_ArrowIconTouched(true)} className='arrowNewIcon'/> 
                    </button>
                    <button onClick={()=> setIndex(index+1)} className='next' >
                    <MdOutlineArrowForwardIos onMouseOver={()=> setProductAds_ArrowIconTouched(true)} className='arrowNewIcon'/>
                    </button>
                </>}
                <div className="slideRadar-wrapper">
                    {adsLinks.map((item, radarIndex)=>{
                    let position = 'nextRadar'
                    if(radarIndex===index){
                        position = 'activeRadar'
                    }
                    return <span className={ `${position} slideRadar`}></span>
                    })}
                </div>
            </div>
            <div className="newCustomerOffer-wrapper">
                <article >
                <div>
                    <h2>Black market offer!</h2>
                    <p>Get products with about 60% off</p>
                </div>  
                <button><span>Coming soon</span><DoubleArrowIcon className="double-icon"/></button>
                </article>
                <main id='offerContainer'>
                {newCustomerOffer.map((arr, index)=>{
                    let position = 'nextSlide2'
                    if(newCustomerOfferIndex === index){
                    position = 'activeSlide2'
                    }
                    if(index === newCustomerOfferIndex-1 || (newCustomerOfferIndex===0 && index===newCustomerOffer.length-1)){
                    position = 'lastSlide2'
                    }
                    return <article className={`${position} quad-product`}>
                    {arr.map((item, index)=>{
                        const {price, img} = item
                        
                        let margin = {'marginLeft': '2.5px', 'marginRight': '2.5px'}
                        if(index===0){
                        margin = {'marginRight': '2.5px'}
                        }
                        if(item.length-1===index){
                        margin = {'marginLeft': '2.5px'}
                        }
                        return <span style={{...margin, width: '110px'}} className="newCustomerOffer-product">
                        <span>
                            <img src={img[0]} alt=""/>
                        </span>
                        <p className="discount-price">&#8358;{price*0.50}</p>
                        <p className="real-price">&#8358;{price}</p>
                        </span>
                    })}
                    </article>
                })}
                </main>
            </div>
            </section>
            <RightSideView/>
        </div>
        {/* <VisualCategory/> */}

    </main>
}
export default FirstRowSection 