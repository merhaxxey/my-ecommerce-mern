import React, {useState, useEffect} from 'react'
import {GrFormAdd} from 'react-icons/gr'
import {AiOutlineMinus} from 'react-icons/ai'
import {useSelector, useDispatch} from 'react-redux'
import { setDisplayViewMore } from '../../features/user-profile/profileSlice'
import {Link} from 'react-router-dom'

import axios from 'axios'
import { API_URL } from '../../ApiUrl'

const RecentlyViewed = ()=>{
    const dispatch = useDispatch()
    const [products, setProducts] = useState({})
    const [loading, setLoading] = useState(true)
    useEffect(async()=>{
        const response = await axios.get(`${API_URL}/api/v1/recentlyViewed`, {withCredentials: true})
        if(response.status === 200){
            setProducts(response.data.products)
        }
        setLoading(false)
        console.log(response.data.products)

    }, [])

    if(loading){
        return <div>please wait ....</div>
    }
    if(products.length <1 ){
        <p style={{'text-align': 'center'}}>No recently viewed Available</p>
    }
    return <main className='order-wrapper recently-wrapper'>
        <small className='order-title'>{products.length>3? 3: products.length} Recently viewed</small>
          {products.map((item, index)=> {
            const {img, user, price, discount, name} = item
            let payablePrice = price - (price * (discount/100))
            payablePrice = Math.ceil(payablePrice)

            if(index>2) return

            return <article className="product-orders recently-viewed">
                <img src={img[0]} alt="" />
                <div className='productInfo'>
                    <div className='info'>
                        <p className='product-name'>{name}</p>
                        <div className='addToCart'>
                            <p className='title'>Add to cart</p>
                            <div className='update-wrapper'>
                                <span className='update'>
                                    <GrFormAdd className='icon add'/>
                                    <input type='text' placeholder='1'/>
                                    <AiOutlineMinus className='icon minus'/>
                                </span>
                                <span>
                                    <p>Total: NGN{payablePrice}</p>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='links'>
                        <Link to={`/product?name=${name}`} >View product</Link>
                    </div>
                </div>
            </article>
        })}
        <button onClick={()=> dispatch(setDisplayViewMore('recently viewed'))} className='view-more-btn'>View more</button>
    </main>
}
export default RecentlyViewed
