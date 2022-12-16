import React,{ useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { setDisplayViewMore } from '../../features/user-profile/profileSlice'
import axios from 'axios'
import {filterUrl} from '../../utils'
import {API_URL} from '../../ApiUrl'
import { BsTypeH3 } from 'react-icons/bs'

const Order = ()=>{
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState({})
    useEffect(()=>{
        const getOrders = async()=>{
            try{
                const response = await axios.get(`${API_URL}/api/v1/order`, {withCredentials: true})
                console.log(response)
                setProduct(response.data.order)
                setLoading(false)
            }catch(error){
                console.log(error)
            }
        }
        getOrders()
    }, [])
    if(loading){
        return <h2>Loading</h2>
    }
    if(product.length <1 ){
        <p style={{'text-align': 'center'}}>No order Available</p>
    }
    console.log(product)
    return <main className='order-wrapper'>
        <small className='order-title'>3 orders</small>
        {product.map((item, index)=>{
            let {image, name, quantity, price} = item

            if(index > 2){
                return
            }

            return <article className="product-orders">
                <img src={image} alt="" />
                <div className='productInfo'>
                    <span className='info'>
                        <p className='product-name'>{name.substring(0, 70)}</p>
                        <span>{quantity} qty</span>
                        <p>NGN{quantity * price} paid</p>
                    </span>
                    <span className='links'>
                        <a href={`/product?name=${name}`}>View product</a>
                        <a href={name} className="make-review">Make a review</a>
                    </span>
                </div>
            </article>
        })}
        
        <button onClick={()=> dispatch(setDisplayViewMore('order'))} className='view-more-btn' type='button'>View more</button>
    </main>
}
export default Order