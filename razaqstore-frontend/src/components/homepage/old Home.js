import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import React, {useRef, useState, useEffect} from 'react'
import {useGlobalContext} from '../StateProvider'
import './Home.css'
import './subCategory.css'
import './MoreToLove.css'
import {imgLinks} from '../productAdsImg'
import {MdArrowBackIosNew} from 'react-icons/md'
import {MdOutlineArrowForwardIos} from 'react-icons/md'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import {FaCommentsDollar, FaUserCircle} from 'react-icons/fa'
import SubCategory from './SubCategory'
import {visualCategory} from '../visualCategory'
import ExclusiveOffer from './ExclusiveOffer';
import FlashSales from './FlashSales'
import MoreToLove from './MoreToLove'
import Footer from './Footer'

const newCustomerOffer_Url = 'http://localhost:3000/newCustomerOffer.json'

//use reducer for category
function Home() {
  const {windowWidth, setWindowWidth, categories, openSubCategory, setOpenSubCategory, subCategoryIndex, setSubCategoryIndex} = useGlobalContext()
  const [adsLinks, setAdsLinks] = useState(imgLinks)
  const [index, setIndex] = useState(0)
  const slideRef = useRef(null)
  const slideWrapper = useRef(null)
  const [newCustomerOffer, setNewCustomerOffer] = useState([])
  const [newCustomerOfferIndex, setNewCustomerOfferIndex] = useState(0)
  const [displayBtns, setDisplayBtns] = useState(true)
  const [productAds_ArrowIconTouched, setProductAds_ArrowIconTouched] = useState(false)
  const [domListIsNull, setDomListIsNull] = useState(false)
  const [disableLargeScreenSlide, setDisableLargeScreenSlide] = useState(false)
  const [slideProductAds, setSlideProductAds] = useState('firstSlide')
  const [isSlideProductAdsChanged, setIsSlideProductAdsChanged] = useState(0)
  const [scrollSlideWidths, setScrollSlideWidths] = useState({})  
  const [currentPostionOfSlide, setCurrentPostionOfSlide] = useState('translateX(0px)')
  const [visualCategories, setVisualCategories] = useState(visualCategory)

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
    setSubCategoryIndex(index)
    setOpenSubCategory(true)
  }
  const removeSubCategoriesListing = (e)=>{
    const result = e.target.classList.contains('category') || e.target.classList.contains('subCategories-h3') || e.target.classList.contains('subCategories-li') || e.target.classList.contains('sub-categories') || e.target.classList.contains('sub-categories-article') || e.target.classList.contains('sub-categories-ul') || e.target.classList.contains('subCategories-h3-a') || e.target.classList.contains('subCategories-li-a')
    if(!result){
      setOpenSubCategory(false)
    }
  }

  
  // this is to check the window screen size
  const changeWindowWidth = ()=>{
    setWindowWidth()
  }  
  useEffect(()=>{
    window.addEventListener('resize', changeWindowWidth)
    
    return ()=> window.removeEventListener('resize', changeWindowWidth)
  }) 

  useEffect(()=>{
    setWindowWidth(window.innerWidth)
    if(windowWidth <= 962){
      setDisableLargeScreenSlide(true)

      //do some calculation of the slider
      const imageWidth = slideRef.current.children[0].width
      const widthOfImagesShowingSideways = window.innerWidth - (imageWidth +10) //10 is the margins
      const firstSlideSideWidth = window.innerWidth - (imageWidth+5)
      setScrollSlideWidths({imageWidth, widthOfImagesShowingSideways, firstSlideSideWidth})
      return
    }  
    setDisableLargeScreenSlide(false)
    
  }, [windowWidth])  
  
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

  useEffect(()=>{
    if(!disableLargeScreenSlide) return

    if(index>=adsLinks.length) return

    const {imageWidth, widthOfImagesShowingSideways, firstSlideSideWidth} = scrollSlideWidths
    let prevLeft = currentPostionOfSlide?.split('(')[1]?.split('px')[0]
    prevLeft = Math.abs(Number(prevLeft))

    if(slideProductAds==='firstSlide'){
      slideRef.current.style.transform = `translateX(0px)` 
    }

    else if(slideProductAds==='secondSlide'){
      slideRef.current.style.transform = `translateX(-${ windowWidth - (firstSlideSideWidth + (widthOfImagesShowingSideways/2)) }px)`
    }

    else if(slideProductAds==='otherSlides'){
      slideRef.current.style.transform = `translateX(-${(prevLeft + (windowWidth - widthOfImagesShowingSideways))}px)`
    }

    else if(slideProductAds==='lastSlide'){
      const productAdsWidth = slideRef.current.clientWidth
      slideRef.current.style.transform = `translateX(-${productAdsWidth - window.innerWidth}px)`
    }

    setCurrentPostionOfSlide(slideRef.current.style.transform)
  }, [slideProductAds, isSlideProductAdsChanged])
  
  //useEffects for large screen transitions
  useEffect(()=>{
    if(!disableLargeScreenSlide){
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
    const getNewCustomerOffer = async()=>{
      const response = await fetch(newCustomerOffer_Url)
      const data = await response.json()
      setNewCustomerOffer(data)
    }
    getNewCustomerOffer()

  }, [newCustomerOffer_Url])

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
            return <a href={`/categories/${index}`} onMouseOver={()=> handleCategoriesListing(index)} className="category" >{item.icon}{item.name}</a>
          })}
      </section> 

      {/* categories items listing on hovering */}
      {openSubCategory && <SubCategory openSubCategory={openSubCategory} />}

      <section className="middle-of-view1">

        <div ref={slideRef} className={`${slideProductAds} productAds`}>
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
              <h2>New customers offer!</h2>
              <p>Get products with up to 60% off</p>
            </div>  
            <button><span>Explore</span><DoubleArrowIcon className="double-icon"/></button>
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
                  return <a href="/newCustomers" style={{...margin, width: '110px'}} className="newCustomerOffer-product">
                    <span>
                      <img src={img[0]} alt=""/>
                    </span>
                    <p className="discount-price">&#8358;{price*0.50}</p>
                    <p className="real-price">&#8358;{price}</p>
                  </a>
                })}
              </article>
            })}
          </main>
        </div>
      </section>
      <section id="left-view">
        <div className="account">
          <span className="userCircleIcon-wrapper">
            {/* <img className="login-background" src="http://localhost:3000/login-background.jpg" alt="" /> */}
            <FaUserCircle className="userCircleIcon"/>
          </span>
          <p className="welcome">Welcome to easyBuy</p>
          <span className="btn-wrapper">
            <button className="signup" type="button">Sign up</button>
            <button className="login" type="button">Login</button>
          </span>      
        </div>
        <article className="newCustomers-offer">
          <p>Exclusive offers</p>
          <h3>Just for new customers</h3>
          <div className="image-grid">
            <img src={"https://ae01.alicdn.com/kf/S81b31d6d00f14a1cb43db7f148b8c1e2M/Original-Air-Pro-4-TWS-Wireless-Headphones-Bluetooth-5-0-Earphone-In-Ear-Earbuds-Gaming-Headset.jpg_220x220xz.jpg_.webp"} alt=""/>
            <img src={"https://ae01.alicdn.com/kf/H606bb95b86df4489bfa571b86267c277U/Sports-Shoes-for-Men-casual-Breathable-Running-Shoes-Men-s-Sneakers.jpg_220x220xz.jpg_.webp"} alt=""/>
            <img src={"https://ae01.alicdn.com/kf/S7ba32432bad54531840fc810005ec908W/2022-Men-Polo-Men-Shirt-Short-Sleeve-Polo-Shirt-Contrast-Color-Polo-New-Clothing-Summer-Streetwear.jpg_220x220xz.jpg_.webp"} alt="" />
            <img src={"https://ae01.alicdn.com/kf/S76c93230e5284eb09a3bdcef1a66b73eF/Hip-Hop-Loose-Men-and-Women-Hoodies-Sweatshirt-Autumn-Streetwear-Bear-with-Glasses-Print-Jumpers-Harajuku.jpg_220x220xz.jpg_.webp"} alt="" />
          </div>
          <button  className="click-here">Click here</button>
        </article>
      </section>
    </div>
    <div className='visualCategories-wrapper'>
      <div className='visualCategories'>
        {visualCategories.map((item, index)=>{
          return <article className='visualCategory'>
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
          </article>
        })}
      </div>
    </div>
    
    <div className="smallScreen-image-grid-wrapper">
      <article>
        <h2>First Order Deal for Newbies</h2>
          <MdOutlineArrowForwardIos className='arrowForward'/>
      </article>
      <ExclusiveOffer/>
    </div>
    <FlashSales countdownTimestampMs={1653670957777 + (1000*60*60*24*3)} width={slideWrapper.current?.clientWidth}/>
    <MoreToLove width={slideWrapper.current?.clientWidth}/>
    <Footer/>
  </main>
}
export default Home