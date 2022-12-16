import React,{useState, useEffect} from 'react'
import {GrFormAdd} from 'react-icons/gr'
import {AiOutlineMinus, AiTwotoneDelete} from 'react-icons/ai'
import {setAllCartItems, deleteAllCart, getAllCart, deleteCart, createCart, createOrder} from '../../features/cart/cartSlice'
import {useNavigate, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {setAccountComponentsMsg} from '../../features/home/homeSlice'
import Footer from '../homepage/Footer'
import CircularIndeterminate from '../progress/Circular'
import PaystackPop from '@paystack/inline-js'
import axios from 'axios'
import './Cart.css'
import { API_URL } from '../../ApiUrl'

function useQuery(){
    const url = useLocation()  

    let redirect = url.search.split('?from=')
    if(redirect.length < 2){
        return ''
    }

    redirect = redirect[1]
    return redirect

}

const Cart = ()=>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [finalize, setFinalize] = useState(true)
    const {allCartItems} = useSelector((store)=> store.cart)
    const {loggedIn} = useSelector((store)=> store.account)
    const {accountComponentsMsg} = useSelector((store)=> store.home)
    const {user} = useSelector((store)=> store.header)
    const [loading, setLoading] = useState(true)
    const [amount, setAmount] = useState({})
    const [subTotal, setSubTotal] = useState(0)
    const [orderTotal, setOrderTotal] = useState(0)
    const [finalizeBtn, setFinalizeBtn] = useState(user?.name? 'Proceed to checkout': 'Login before purchase')
    const [localCartItems, setLocalCartItems] = useState([])
    let redirect = useQuery()

    useEffect(()=>{
        setLocalCartItems(allCartItems)
    }, [])
    
    useEffect(()=>{
        // setLoggedIn({})
        
        if(redirect == 'login'){
            const transferCarts = async()=>{
                let tempArr = []
                const carts =  await accountComponentsMsg?.payload?.localCartItems.map(async(singleProduct, index)=>{
                    const {name, img, price, _id, quantity, product} = singleProduct
                    try{
                        // console.log(accountComponentsMsg)

                        const response = await axios.patch(`${API_URL}/api/v1/cart/transfer/${_id}`, {user: accountComponentsMsg.payload.user.userId}, {withCredentials: true})
                        // console.log('hey guys am loggeed in')
                        tempArr.push(response.data.cart)
                        return response
                        
                    }catch(error){
                        // console.log(error)
                    }
                })
                redirect = ''
                tempArr = [...allCartItems, ...tempArr]

                dispatch(setAllCartItems(tempArr))
            }
            transferCarts()
        }
        const name = accountComponentsMsg?.payload?.user?.name
        setFinalizeBtn(name?'Proceed to checkout': 'Login before purchase')
    }, [accountComponentsMsg])

    // console.log('please wait .............',accountComponentsMsg?.payload?.user?.name )

    const handleCartUpdate = (value, index, product)=>{
        // console.log(value)
        dispatch(createCart({product, quantity: value}))
    }

    const handleClearCart = async()=>{
        const response = await axios.delete(`${API_URL}/api/v1/cart/`, {withCredentials: true})
        if(response.status === 200){
            dispatch(getAllCart())
        }
    }

    const cartUpdate = (value, type, index, product)=>{
        if(type === 'minus' && value <= 1 ){
            // console.log('-------------deleting cart----')
            return dispatch(deleteCart(product))
        }
        if(type === 'minus' ){
            value = value - 1
            handleCartUpdate(value, index, product)
        }
        if(type === 'add'){
            value = value + 1
            handleCartUpdate(value, index, product)
        }
    }

    const payWithPaystack = async(e)=>{
        e.preventDefault()

        if(!user?.name){
            navigate('/account/login?redirect=cart')
            return
        }
        
        if(!finalize) return

        let currentUser
        try {
            currentUser = await axios.get(`${API_URL}/api/v1/user/${user.userId}`, {withCredentials: true})
     
        } catch (error) {
            // console.log(error)
            return
        }
        const {email, name} = currentUser.data.user
        // console.log(email, name)
        const paystack = new PaystackPop()
        paystack.newTransaction({
            key: "pk_test_5351cc03ecda75b6ad6c256f3305f720f1edaf4e",
            amount: orderTotal *100,
            email: email,
            name,
            onSuccess: (transaction)=>{
                let message = `Payment complete! Reference ${transaction.reference}`
                
                const payload = {shippingFee: 1490, cartItems:allCartItems, paymentReference:transaction.reference, status:'paid'}
                const createOrder = async()=>{
                    try{
                        const response = await axios.post(`${API_URL}/api/v1/order/`, payload, {withCredentials: true})
                        console.log(response)
                        if(response.status == 201){
                            const response = await axios.delete(`${API_URL}/api/v1/cart/`, {withCredentials: true})
                            if(response.status === 200){
                                dispatch(getAllCart())
                            }
                        }
                    }catch(error){
                        console.log(error)
                    }
                }
                createOrder()
                setFinalize(true)
                
            },
            onCancel: ()=>{
                // console.log('You have cancel this transaction')
                const payload = {shippingFee: 1490, cartItems:allCartItems, status:'failed'}

                dispatch(createOrder(payload))

                setFinalize(true)
            }
        })
        setFinalize(false)
    }

    useEffect(()=>{
        let amountTemp = {}
        let subTotal = 0
        if(allCartItems?.length > 0){
            allCartItems?.map((item, index)=>{
                amountTemp[`quantityInput${index}`] = item.quantity
                // to get subtotal
                subTotal += item.quantity * item.price
                return item.quantity
            })
        }
        setOrderTotal(subTotal + 1490)
        setSubTotal(subTotal)
        setAmount(amountTemp)
        setLoading(false)
    }, [allCartItems])

    useEffect(()=>{
        dispatch(getAllCart())
    }, [])

    // console.log('-,-,-,-,--,',user?.name)

    if(loading){
        return <CircularIndeterminate/>
    }
    if(allCartItems?.length < 1){
        return <h2 style={{"textAlign": "center"}}>No Cart Available</h2>
    }
    return <main className='cart-page'>
        <h2 className='page-title'>Shopping Cart</h2>

        <section className='cart-detail'>
            <div className='list list-heading'>
                <p className='productImage'></p>
                <p className='name text'>Item</p>
                <p className='text'>Price</p>
                <p className='text'>Quantity</p>
                <p className='text'>Subtotal</p>
                <p className='delete' id='list-delete'></p>
            </div>
            <hr className='horizontal-line' />
            {allCartItems?.map((item, index)=>{
                const {img, name, quantity, price, product} = item
                if(amount[`quantityInput${index}`]=== undefined){
                    setAmount({...amount, [`quantityInput${index}`]: 0})
                } 
                return <div className='list list-products-wrapper'>
                    <div className='list-products'>
                        <span className='img'>
                            <img src={img} alt="" />
                        </span>
                        <p className='name item'>{name.slice(0, 45) + '...'}</p>
                        <span className='price item' id='cart-price'>NGN{price}</span>
                        <article className='item cart-quantity'>
                            <span className='price'>Price: NGN{price}</span>
                            <div className='update'>
                                <AiOutlineMinus onClick={()=> cartUpdate(amount[`quantityInput${index}`], 'minus', index, product)} className='icon reduce'/>
                                <input name={`quantityInput${index}`} value={amount[`quantityInput${index}`]} onChange={(e)=> handleCartUpdate(e.target.value, index, product)} type="text" />
                                <GrFormAdd onClick={()=> cartUpdate(amount[`quantityInput${index}`], 'add', index, product)} className='icon increase'/>
                            </div>
                        </article>
                        <p className='subtotal item' id='cart-subtotal'>{quantity * price}</p>
                        <AiTwotoneDelete onClick={()=> dispatch(deleteCart(product))} className='delete product-delete' id='product-delete'/>
                    </div>
                    <hr />
                </div>
            })  
            }
            <div className='lower-part-of-cartPage'>
                <div className='clear-cart'>
                    <button onClick={handleClearCart} type='button'>Clear Shopping Cart</button>
                </div>
                <div className='subtotal-breakdown'>
                    <div className='subtotal'>
                        <span className='title'>Subtotal: </span> <span className='price'>NGN{subTotal}</span>
                    </div>
                    <div className='shipping-fee'>
                        <span className='title'>Shipping Fee: </span> <span className='price'>NGN1490</span>
                    </div>
                    <hr />
                    <div className='order-total'>
                        <span className='title'>Order Total: </span> <span className='price'>NGN{orderTotal}</span>
                    </div>
                </div>
                <button type='button' onClick={payWithPaystack} className='finalize'>Proceed to purchase</button>
            </div>
        </section>
        <Footer/>
    </main>
}

export default Cart 