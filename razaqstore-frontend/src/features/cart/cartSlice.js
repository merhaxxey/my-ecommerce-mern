import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import {API_URL} from '../../ApiUrl'

const initialState = {
    isLoading: true,
    cartItems: [],
    cartAmount: 0,
    allCartItems: [],
    allAmount: 0,
    order: {},
    localCartAmount: 0
}

export const createCart = createAsyncThunk('cart/createCart', async(payload)=>{
    let cart
    try {
        cart = await axios.get(`${API_URL}/api/v1/cart/${payload.product}`, {withCredentials: true})
        cart = await axios.patch(`${API_URL}/api/v1/cart/${payload.product}`, {quantity: payload.quantity}, {withCredentials: true})
    } catch (error) {
        cart = await axios.post(`${API_URL}/api/v1/cart`, payload, {withCredentials: true})
    }
    console.log(cart)
    return cart
})


export const updateCart = createAsyncThunk('cart/updateCart', async(productId, payload)=>{
    try {
        const response = await axios.patch(`${API_URL}/api/v1/cart/${productId}`, payload, {withCredentials: true})
        return response
    } catch (error) {
        console.log(error)
    }
})

export const getAllCart = createAsyncThunk('cart/getAllCart', async()=>{
    try {
        const response = await axios.get(`${API_URL}/api/v1/cart/`, {withCredentials: true})
        console.log('wetin wetin wetin ', response)
        return response
    } catch (error) {
        console.log(error)
    }
})

export const getSingleCart = createAsyncThunk('cart/getSingleCart', async(productId)=>{
    try {
        const response = await axios.get(`${API_URL}/api/v1/cart/${productId}`, {withCredentials: true})
        return response
    } catch (error) {
        console.log(error)
    }
})
export const deleteCart = createAsyncThunk('cart/deleteCart', async(productId)=>{
    try {
        const response = await axios.delete(`${API_URL}/api/v1/cart/${productId}`, {withCredentials: true})
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
    }
})

export const createOrder = createAsyncThunk('cart/createOrder', async(payload)=>{
    try {
        const response = await axios.post(`${API_URL}/api/v1/order/`, payload, {withCredentials: true})
        return response
    } catch (error) {
        console.log(error)
    }
})

export const deleteAllCart = createAsyncThunk('cart/createOrder', async(payload)=>{
    try {
        const response = await axios.delete(`${API_URL}/api/v1/cart/`, {withCredentials: true})
        return response
    } catch (error) {
        console.log(error)
    }
})

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        setCartAmount: (state, action)=>{
            state.cartAmount = action.payload
        },
        setAllAmount: (state, action)=>{
            state.allAmount = action.payload
        },
        setLocalCartAmount: (state, action)=>{
            state.localCartAmount = action.payload
        },
        setAllCartItems: (state, action)=>{
            state.allCartItems = action.payload
        }
    },
    extraReducers:{
        [createOrder.pending]: (state)=>{
            state.isLoading = true
        },
        [createOrder.fulfilled]: (state, action)=>{
            state.allCartItems = action?.payload?.data? action.payload.data.allCart: []
            state.isLoading = false
        },
        [createOrder.rejected]: (state)=>{
            state.isLoading = false
        },


        [createCart.pending]: (state)=>{
            state.isLoading = true
        },
        [createCart.fulfilled]: (state, action)=>{
            state.cartItems = action.payload
            state.allCartItems = action?.payload?.data? action.payload.data.allCart: []
            state.cartAmount = action.payload.data.cart.quantity
            state.isLoading = false
        },
        [createCart.rejected]: (state)=>{
            state.isLoading = false
        },

        
        [updateCart.pending]: (state)=>{
            state.isLoading = true
        },
        [updateCart.fulfilled]: (state, action)=>{
            state.cartItems = action.payload
            state.allCartItems = action?.payload?.data? action.payload.data.allCart: []    
            state.cartAmount = action.payload.data.cart.quantity
            state.isLoading = false
        },
        [updateCart.rejected]: (state)=>{
            state.isLoading = false
        },
        
        [getAllCart.pending]: (state)=>{
            state.isLoading = true
        },
        [getAllCart.fulfilled]: (state, {payload})=>{
            const carts = payload?.data? payload.data.cart: 0
            let totalCartAmountTemp = 0
            if(carts){
                totalCartAmountTemp = carts.reduce((total, item)=>{
                    return total + item.quantity
                }, 0)
            }

            
            state.allCartItems = payload? payload.data.cart: []
            state.allAmount = totalCartAmountTemp
            state.isLoading = false
        },
        [getAllCart.rejected]: (state)=>{
            state.isLoading = false
        },

        [getSingleCart.pending]: (state)=>{
            state.isLoading = true
        },
        [getSingleCart.fulfilled]: (state, {payload})=>{
            state.cartItems = payload
            state.cartAmount = payload?.data?.cart? payload.data.cart.quantity: 0
            state.allCartItems = payload?.data? payload.data.allCart: []
            console.log(payload)
            state.isLoading = false
        },
        [getSingleCart.rejected]: (state)=>{
            state.isLoading = false
        },

        [deleteCart.pending]: (state)=>{
            state.isLoading = true
        },
        [deleteCart.fulfilled]: (state, action)=>{
            state.cartItems = action.payload
            state.allCartItems = action?.payload?.data? action.payload.data.allCart: []
            state.cartAmount = state.cartAmount<1? 0: state.cartAmount - 1
            state.allAmount = state.allAmount - 1
            state.isLoading = false
        },
        [deleteCart.rejected]: (state)=>{
            state.isLoading = false
        },

        [deleteAllCart.pending]: (state)=>{
            state.isLoading = true
        },

        [deleteAllCart.fulfilled]: (state, action)=>{
            state.cartItems = action.payload
            state.allCartItems = action?.payload?.data? action.payload.data.allCart: []
            state.cartAmount = 0
            state.allAmount = 0
            state.isLoading = false
        },
        [deleteAllCart.rejected]: (state)=>{
            state.isLoading = false
        },

        [createOrder.pending]: (state)=>{
            state.isLoading = true
        },
        [createOrder.fulfilled]: (state, action)=>{
            state.order = action.payload? action.payload.data.order: {}
            state.isLoading = false
        },
        [createOrder.rejected]: (state)=>{
            state.isLoading = false
        }
    }
})

export const {setCartAmount, setAllAmount, setLocalCartAmount, setAllCartItems} = cartSlice.actions
export default cartSlice.reducer