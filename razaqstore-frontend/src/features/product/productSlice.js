import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import { API_URL } from '../../ApiUrl'

const initialState = {
    addItemsToCart: 0,
    product: {},
    reviewsPerRatingLevel: {},
    reviewUserName: [],
    isLoading: true,
    similarProduct: [],
    writeReview: true
}

export const getProduct = createAsyncThunk('product/getproduct', async(name)=>{
    try {
        console.log(name)
        const product = await axios.get(`${API_URL}/api/v1/product/single?name=${name}`, {withCredentials: true})
        return product
    } catch (error) {
        
    }
})

export const getSimilarProduct = createAsyncThunk('products/getSimilarProduct', async(categoryName)=>{
    try {
        const similarProduct = await axios.get(`${API_URL}/api/v1/product/similar/${categoryName}`, {withCredentials: true})
        console.log(similarProduct)
        return similarProduct
    } catch (error) {
        
    }
})

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers:{
        setAddItemsToCart: (state, action)=>{
            state.addItemsToCart = action.payload
        },
        resetProps: (state)=>{
            state.addItemsToCart = 0
            state.reviewsPerRatingLevel = {}
            state.reviewUserName = []
            state.isLoading = true
            state.similarProduct = []
            state.writeReview = true
        },
        setIsLoading:(state, {payload})=>{
            state.isLoading = payload
        },
        setWriteReview: (state, action)=>{
            state.writeReview = action.payload
        },
        setProduct: (state, action)=>{
            state.product = action.payload
        }
    },
    extraReducers:{
        [getProduct.pending]:(state, action)=>{
            state.isLoading = true
        },
        [getProduct.fulfilled]:(state, action)=>{
            state.isLoading = false
            if(action.payload){
                state.reviewUserName = action.payload?.data?.reviewUserName
                state.reviewsPerRatingLevel = action.payload?.data?.reviewsPerRatingLevel
                state.product = action.payload?.data.product
            }
        },
        [getProduct.rejected]:(state)=>{
            state.isLoading = false
        },

        [getSimilarProduct.pending]:(state)=>{
            state.isLoading = true
        },
        [getSimilarProduct.fulfilled]:(state, action)=>{
            console.log('similar product', action)
            if(action.payload){
                state.similarProduct = action.payload?.data?.product
            }
        },
        [getSimilarProduct.rejected]:(state)=>{
        }
    }
})

export const {setAddItemsToCart, setIsLoading, setProduct, setWriteReview, resetProps} = productSlice.actions
export default productSlice.reducer