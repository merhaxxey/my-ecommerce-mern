import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {BsArrowLeft} from 'react-icons/bs'
import { setDisplayViewMore } from '../../features/user-profile/profileSlice'
import {Link} from 'react-router-dom'
import axios from 'axios'
import CircularIndeterminate from '../progress/Circular'
import { API_URL } from '../../ApiUrl'

const ViewMore = ()=>{
    const dispatch = useDispatch()
    const {displayViewMore} = useSelector((store)=> store.profile)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const func = async()=>{
            const response = await axios.get(`${API_URL}/api/v1/recentlyViewed`, {withCredentials: true})
            if(response.status === 200){
                setProducts(response.data.products)
            }
            setLoading(false)
            console.log(response.data.products)

        }
        const funcOrder = async()=>{
            try{
                const response = await axios.get(`${API_URL}/api/v1/order`, {withCredentials: true})
                if(response.status === 200){
                    setProducts(response.data.order)
                }
    
                setLoading(false)
            }catch(error){
                console.log(error)
            }

        }

        if(displayViewMore === 'recently viewed'){
            func()
        }
        if(displayViewMore === 'order'){
            funcOrder()
        }
    }, [])

    if(loading){
        <CircularIndeterminate/>
    }

    return <main className='view-more-wrapper'>
        <nav className='view-more-nav'>
            <BsArrowLeft onClick={()=> dispatch(setDisplayViewMore(''))} className='icon'/>
            <span className='title'>{displayViewMore}</span>
        </nav>
        <hr />
        <section className='order-wrapper'>
            <small className='order-title'>{products.length} {displayViewMore}</small>
            {products.map((item, index)=>{
                const {img, name, price, discount, image} = item
                let payablePrice = price - (price * (discount/100))
                payablePrice = Math.ceil(payablePrice)

                return <article className="product-orders">
                    <img src={displayViewMore==='recently viewed'? img[0]: image } alt="" />
                    <div className='productInfo'>
                        <span className='info'>
                            <p className='product-name'>{name}</p>
                            <span>5 qty</span>
                            <p>NGN{payablePrice}</p>
                        </span>
                        <span className='links'>
                            <Link to={`/product?name=${name}`} >View product</Link>
                        </span>
                    </div>
                </article>
            })}
        </section>
        
    </main>
}
export default ViewMore