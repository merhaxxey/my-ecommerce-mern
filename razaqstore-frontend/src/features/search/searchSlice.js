import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import { API_URL } from '../../ApiUrl'

const initialState = {
    products: [],
    isLoading: true,
    formValue: {min:0, max:0},
    search: false,
    defaultFilterValues:{
        formValue: {min:0, max:0},
        discountValues: 'no'
    }
}

export const searchProducts = createAsyncThunk('search/getProducts', async(string)=>{
    try{
        const searchResult = await axios.get(`${API_URL}/api/v1/search/${string}`, {withCredentials: true})
        console.log('string', searchResult)
        return searchResult
    }
    catch(error){
        // return thunkAPI
    }
})

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setIsLoading: (state, action)=>{
            state.isLoading = action.payload
        },
        setFormValue: (state, action)=>{
            state.formValue = action.payload
        },
        setProducts: (state, action)=>{
            state.products = action.payload
        },
        setSearch: (state, action)=>{
            state.search = action.payload
        },
        setDefaultFilterValues: (state, action)=>{
            state.defaultFilterValues = action.payload
        }
    },
    extraReducers:{
        [searchProducts.pending]:(state, action)=>{
            state.isLoading = true
        },
        [searchProducts.fulfilled]:(state, {payload})=>{    
            state.isLoading = false
            if(payload?.data){
                if('searchResult' in payload.data){
                    state.products = payload.data?.searchResult
                }
            }
        },
        [searchProducts.rejected]:(state, action)=>{
            state.isLoading = false
            console.log(action.payload)
        }
    }
})

export const {
    setIsLoading,
    setFormValue,
    setProducts,
    setDefaultFilterValues,
    setSearch
} = searchSlice.actions

export default searchSlice.reducer