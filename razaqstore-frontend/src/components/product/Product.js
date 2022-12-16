import React,{useState, useEffect, useRef} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {categories} from '../../categories'
import {IoIosArrowForward} from 'react-icons/io'
import CreateRatingStars from './CreateRatingStars'
import {GrFormAdd} from 'react-icons/gr'
import {BiMinus} from 'react-icons/bi'
import {BsTruck} from 'react-icons/bs'
import {MdHouseSiding} from 'react-icons/md'
import { MdAssignmentReturn } from "react-icons/md";
import StarsIcon from '@mui/icons-material/Stars';
import DOMPurify from 'dompurify'
import Specification from './Specification'
import {BsDot} from 'react-icons/bs'
import {rating} from '../../rating'
import Footer from '../homepage/Footer'
import CurrencyFormat from 'react-currency-format'
import {useLocation} from 'react-router-dom'
import {timeDiff} from './timeDiff'
import WriteAReview from './WriteAReview'
import MobileSlider from './mobile/Slider'
import Circular from '../progress/Circular'
import axios from 'axios'
import {filterUrl} from '../../utils'
import './Product.css'
import './ProductDetails.css'
import './RatingAndReview.css'

import {useSelector, useDispatch} from 'react-redux'
import {setProduct, setAddItemsToCart} from '../../features/product/productSlice'
import {setWriteReview, getProduct, getSimilarProduct } from '../../features/product/productSlice'
import {createCart, setAllAmount, updateCart, getAllCart, getSingleCart, deleteCart} from '../../features/cart/cartSlice'
import {setCartAmount} from '../../features/cart/cartSlice'

function useQuery(){
    const url = useLocation()  

    return url.search.split('?name=')[1]
}

const Product = ()=>{
    const dispatch = useDispatch()
    const {windowWidth} = useSelector((store)=> store.home)
    const {product, writeReview, similarProduct, reviewsPerRatingLevel, reviewUserName} = useSelector((store)=> store.product)
    const {cartAmount, allAmount, cartItems} = useSelector((store)=> store.cart)
    const name = useQuery().split('%20').join(' ')
    const productInfoRef = React.useRef(null)
    const [productCategories, setProductCategories] = useState([])
    const [priceDiscount, setPriceDiscount] = useState(0)
    const {addItemsToCart} = useSelector((store)=> store.product)
    const [imageToDisplay, setImageToDisplay] = useState('')
    const productInfoWidthRef = useRef(null)
    const [specificationsWidth, setSpecificationsWidth] = useState(0)
    const [userReview, setUserReview] = useState(rating)
    const [ratingLevel, setRatingLevel] = useState(true)
    const [reviewCreated, setReviewCreated] = useState(0)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    // DD means dropdown
    const [productDetailDD, setProductDetailDD] = useState(true)
    const [keyFeaturesDD, setKeyFeaturesDD] = useState(true)
    const [specificationDD, setSpecificationDD] = useState(true)
    const [localCartAmount, setLocalCartAmount] = useState(0)
    //fetch products

    const setVariables = ()=>{

        // if (products.length ===0) return
        let discount = product.discount
        discount = (100-discount)/100
        discount = Math.ceil(product.price * discount)

        setImageToDisplay(product?.img[0])
        setPriceDiscount(discount)
        setProductCategories(categories)
        
        let rating = []
        
        for(let i=5; i>0; i--){
            let curLevel = reviewsPerRatingLevel.find((item, index)=> item._id === i)
            if(!curLevel){
                curLevel = {amount: 0}
            }
            rating.push(<div className='progress-wrapper'>
                <span className='numOfStar'>{i} ({curLevel.amount})</span>
                <span class="progress">
                    <span class="progress-bar" role="progressbar" aria-label="Basic example" style={{width: `${curLevel.amount / 5 * 100}%`}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></span>
                </span>
            </div>)
        }
        let temp = 0
        if(product.reviews || product.reviews.length>0){    
            const dateDiff = timeDiff(product.reviews[0]?.createdAt)
            console.log('cratedAt ------- ', dateDiff)
            if(dateDiff.diffYear>0){
                setReviewCreated(`${dateDiff.diffYear} years ago`)
            }
            else if(dateDiff.diffMonth>0){
                setReviewCreated(`${dateDiff.diffMonth} months ago`)
            }
            else if(dateDiff.diffDay>0){
                setReviewCreated(`${dateDiff.diffDay} days ago`)
            }
            else if(dateDiff.diffMinutes>0){
                setReviewCreated(`${dateDiff.diffMinutes} minutes ago`)
            }
            else if(dateDiff.diffSeconds>0){
                setReviewCreated(`${dateDiff.diffSeconds} seconds ago`)
            }
            else{
                setReviewCreated(`0 seconds ago`)
            }
        }
        dispatch(getSimilarProduct(product.category))
        setRatingLevel(rating)
        setLoading(false)

    }

    useEffect(()=>{
        if( Object.keys(product).length != 0){
            setVariables()
            dispatch(getSingleCart(product._id))
        }
    }, [product])
    
    useEffect(()=>{
        dispatch(getProduct(filterUrl(name)))
    }, [])


    useEffect(()=>{
        setSpecificationsWidth(productInfoWidthRef.current?.clientWidth)
    }, [loading, windowWidth])

    // useEffect(async()=>{
    //     if(cartAmount > 0){
    //         const {name, img, price, _id} = product
    //         const payload = {name, img, price, product:_id, quantity:cartAmount}
    //         console.log(payload)
    //         dispatch(createCart(payload))
    //     }
    // }, [cartAmount])
    useEffect(()=>{
        console.log('i am cartItems, changed ', cartItems?.cart?.quantity)
        setLocalCartAmount(cartAmount)
    }, [cartItems])

    if(loading){
        return <Circular />
    }
    const handleCartChange = (amount)=> {
        if(amount < 0){
            return dispatch(setCartAmount(0))
        }
        if((amount === 0) && (cartAmount > 0)){
            return dispatch(deleteCart(product._id))
        }
        
        const {name, img, price, _id} = product
        const payload = {name, img, price, product:_id, quantity:amount}
        dispatch(createCart(payload))
    }
    const decreaseAmount = ()=>{
        const amount = cartAmount - 1
        handleCartChange(amount)
    }
    const increaseAmount = ()=>{
        const amount = cartAmount + 1
        handleCartChange(amount)

    }
    

    return <div  id='product-id' className='product'>
        <ul className='product-directory-links'>
            <li>
                <a href="/">Product</a>
            </li>
            <li>
                <IoIosArrowForward className='icon'/>
            </li>
            <li>    
                <a href="/">{productCategories[product.categoryIndex]?.name}</a>
            </li>
            <li>
                <IoIosArrowForward className='icon'/>
            </li>
            <li>
                <a href="/">{product.category}</a>
            </li>
        </ul>
        <div ref={productInfoWidthRef} className='product-information'>
            {
                (windowWidth<=780 && product?.img?.length > 1) &&
                <MobileSlider loading={loading}/>
            }
            {(windowWidth > 780 || product?.img?.length <= 1) && <article className='image-viewer'>
                <img src={imageToDisplay} alt="" />
                {
                    product?.img?.length < 2  ||
                    <span className="image-list">
                        {
                            product.img.map((item, index)=>{
                            return <img  onClick={()=>{setImageToDisplay(product.img[index])}}   src={item} alt="" />
                        })}
                    </span>
                }
            </article>}


            {/*-------------  The product information wrapper  -----------------  */}
            <div ref={productInfoRef} className='product-info-wrapper'>
                <article className='product-info'>
                    {product.brand && <a href='/brand-products' className='product-brand'>{product.brand}</a>}
                    <p className='product-name'>{product.name}</p>
                    <div className='rating-wrapper'>
                        <article>
                            <CreateRatingStars productRating={product.averageRating}/>
                            <Link className='others reviews'  to='/reviews/:reviewId'>{`(${product.averageRating})`}</Link>
                            <span className='others verified-rating' >{product.reviews.length} verified rating</span>
                        </article>
                    </div>
                    <div className='prices-wrapper'>
                        <span id='price-discount-id' className='price-discount'><span id='naira-sign1'>NGN</span>{`${priceDiscount}`}</span>
                        <span id='price-id' className='price'>NGN{product.price}</span>
                        <span id='discount-rate-id' className='discount-rate'>{-product.discount}%</span>
                    </div>

                    <div id='quantity-wrapper-id' className='quantity-wrapper'>
                        <p className='title'>Quantity</p>
                        <span className='quantity-control-wrapper'>
                            <button onClick={decreaseAmount} type='submit'><BiMinus className='icon decrease-button' /></button>
                            <input onChange={(e)=> handleCartChange(e.target.value)} name='cartAmount' value={localCartAmount} className='input-box' type="text" />
                            <button onClick={increaseAmount} type='submit'><GrFormAdd className='icon increase-button' /></button>
                       
                            <span style={{}} className='quantity-left'>only 9 left</span>
                        </span>

                    </div>
                    <div className='product-purchase-buttons'>
                        <button  className='buy-button' onClick={()=> {
                            if(localCartAmount < 1){
                                handleCartChange(1)
                            }
                            navigate('/cart')
                        }}>Buy Now</button>

                        <button  onClick={()=> handleCartChange(cartAmount + 1)} className='cart-button'>Add to Cart</button>
                    </div>
                </article>
                <article className='delivery-and-return'>
                    <p className='title'>Delivery and Return</p>
                    <span className='article door-delivery'>
                        <span className='icon-wrapper'>
                            <BsTruck className='icon'/>
                        </span>
                        <span className='sub-article'>
                            <b>Door Delivery</b>
                            <p>Delivery to door step cost NGN500 within Ondo state. note the price varies from location to location</p>
                            <p>Goods will be delivered within 48hrs of order</p>
                        </span>
                    </span>
                    <span className='article pickup-station'>
                        <span className='icon-wrapper'>
                            <MdHouseSiding className='icon'/>
                        </span>
                        <span className='sub-article'>
                            <b>Pickup station</b>
                            <p>Delivery cost NGN630</p>
                            <p>Goods will be delivered within 48hrs of order</p>
                        </span>
                    </span>
                    <span className='article return-policy'>
                        <span className='icon-wrapper'>
                            <MdAssignmentReturn className='icon'/>
                        </span>
                        <span className='sub-article'>
                            <b>Return policy</b>
                            <p>Product will be returned within 75days. But not all seller accept return so check the seller information</p>
                        </span>
                    </span>
                </article>
            </div>
            {/* ------------------ seller information ---------------------- */}
            <section className='rightMostView-of-productInformation'>
                <div className='seller-information'>
                    <div className='seller-info-container'>

                        <h3>Seller Information</h3>
                        <article id='seller-info-wrapper-id' className='seller-info-wrapper'>
                            <span className='seller-info'>
                                <b id='sellerName'>Johnny Limited</b>
                                <p>90% seller score</p>
                                <p>1000 followers</p>
                            </span>
                            <span id='followBtn-wrapper' style={{display: 'inline-block'}}>
                                <b style={{display: 'none'}} className='mobileView-sellerName'>Johnny Limited</b>
                                <button type='submit'>Follow</button>
                            </span>
                        </article>
                    </div>
                    {windowWidth<781 || <article className='seller-performance-wrapper'>
                        <h4 className='title'>Seller Performance</h4>
                        <span className='seller-performance seller-performance1'>
                            <i><StarsIcon  className='icon'/></i>
                            <p>Order fulfilment: </p>
                            <p className='grade'>Excellent</p>
                        </span>
                        <span className='seller-performance'>
                            <i><StarsIcon className='icon'/></i>
                            <p>Quality Score: </p>
                            <p className='grade'>Good</p>
                        </span>
                        <span className='seller-performance'>
                            <i><StarsIcon className='icon'/></i>
                            <p>Customer rating: </p>
                            <p className='grade'>Good</p>
                        </span>
                    </article>}
                </div>
                <article className='other-similar-products'>
                    <h4 className='title'>Other similar product</h4>

                    {similarProduct.map((product, index)=>{
                        const urlName = filterUrl(product.name)
                        return ( 
                            <Link to={`/product/?name=${urlName}`} className='similar-product'>
                                <img src={product.img[0]} alt="" />
                                <p>NGN{product.price}</p>
                            </Link>
                        )
                    })}
                </article>
            </section>
        </div>

        <div className='about-product-and-customer-review' style={{width: `${productInfoWidthRef?.current?.clientWidth}px`}} >
            {/* --------------------   about product   -------------------------- */}
            <div  className='about-product-section'>
                <article className='description-wrapper'>
                    <span className='heading'>
                        <h3 className='title'>Product details</h3>
                        <IoIosArrowForward
                            onClick={()=> setProductDetailDD(!productDetailDD)}
                            className={`arrow-btn ${productDetailDD || 'arrow-btn-dropDown'}`}
                         />
                    </span>
                    <article
                        className={`description`}
                        id={`${productDetailDD || 'description-dropDown'}`}
                        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(product.product_details)}}
                    >
                    </article>
                </article>
                <Specification className='specComponent' product={product}/>
                
            </div>

            {/* --------------   customer review  ----------------------------- */}
            <div className='customer-review-and-rating'>
                <h3 className='heading'>Customer rating and reviews</h3>
                <article className='customer-rating'>
                    <span className='rating-score'>{product.averageRating}<p>out of</p>5</span>
                    <span className='stars-and-review'>
                        <CreateRatingStars productRating={product.averageRating}/>
                        <span className='verified'>({product.reviews.length}) verified review</span>
                    </span>
                    <div className='rating-progress-wrapper'>
                        {
                            ratingLevel.map((item, index)=>{
                                return item
                            })
                        }
                    </div>

                </article>
                <article className='reviews-wrapper'>
                    <div className='review-buttons'>
                        <Link className='see-all-reviews' to='/product/reviews'>See all review</Link>
                        <span onClick={()=> dispatch(setWriteReview(false))} className='create-reviews' >Write a review</span>
                    </div>
                    <div className='single-review-wrapper'>
                        {product.reviews.map((review, index)=>{
                            return <div id='review-id' className='review'>
                                <span className='text-header'>
                                    <span className='user-info'>
                                        <span className='by'>By</span>
                                        <BsDot className='BsDoticon'/>
                                        <span className='user-name'>{reviewUserName[index]}</span>
                                        <small className='date-posted'>{reviewCreated}</small>
                                    </span>
                                    <span className='rating-star'>
                                        <CreateRatingStars productRating={review.rating} className='stars'/>
                                    </span>
                                </span>
                                <span  className='user-text'>
                                    <p className='title'>{review.title}</p>
                                    <span id='comment-id' className='comment'>{review.comment}</span>
                                </span>
                            </div>
                        })}
                    </div>
                </article>
            </div>
            <article className='productMiniShow'>
                <img src={product.img[0]} alt="" srcset="" />
                <div className='info'>
                    <h3 id='title-id' className='title'>{product.name}</h3>
                    <span className='price-wrapper'>
                        <span id='discount-price-id' className='discount-price'>NGN{priceDiscount}</span>
                        {product.discount===0 || <span className='price'>{product.price}</span>}
                        {product.discount===0 || <span className='discount-rate'>-{product.discount}%</span>}
                    </span>
                    <span className='rating-wrapper'>
                        <CreateRatingStars productRating={product.averageRating}/>
                        <br style={{display: 'none'}} />
                        <Link className='others reviews'  to='/reviews/:reviewId'>{`(${product.averageRating})`}</Link>
                        <span className='others verified-rating' >3 verified rating</span>
                    </span>

                </div>
                <button id='addToCart-btn'>Add to cart</button>
            </article>
        </div>
        
        {!writeReview &&
            <WriteAReview product={product} />}
        <div className='sticky-buttons'>
            <button className='buy-button' onClick={()=> {
                if(localCartAmount < 1){
                    handleCartChange(1)
                }
                navigate('/cart')
            }}>Buy Now</button>
            <button onClick={()=> handleCartChange(cartAmount + 1)} className='cart-button'>Add to Cart</button>
        </div>
        <Footer/>
    </div>
}

export default Product 