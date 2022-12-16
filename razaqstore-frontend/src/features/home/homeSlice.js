import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {categories} from '../../categories'
import axios from 'axios'
import {API_URL} from '../../ApiUrl'

const initialState = {
    categories,
    subCategoryIndex: 0,
    openSubCategory: false,
    windowWidth: window.innerWidth,
    firstRowSectionWidth: 0,
    products:[],
    isLoading: true,
    isSigninLoading: true,
    isFulfilledLoading: true,
    signedIn: {},
    accountComponentsMsg: {}
}


export const signInUser = createAsyncThunk('header/signInUser', async({email, password})=>{
    try{
        const {data} = await axios.post(`${API_URL}/api/v1/auth/login`,{
            email,
            password
        }, {withCredentials: true})
        return data
    }catch(error){
        console.log(error)
    }

})

export const getProducts = createAsyncThunk('home/getProducts',  async()=>{
    try {
        const products = await axios.get(`${API_URL}/api/v1/product/`, {withCredentials: true})
        return products
        
    } catch (error) {
        
    }
})

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers:{
        setSubCategoryIndex: (state, action)=>{
            state.subCategoryIndex = action.payload
        },
        setOpenSubCategory: (state, action)=>{
            state.openSubCategory = action.payload
        },
        setWindowWidth: (state)=>{
            state.windowWidth = window.innerWidth
        },
        setFirstRowSectionWidth: (state, action)=>{
            console.log('firstRowSectioWidth  ', action.payload)
            state.firstRowSectionWidth = action.payload
        },
        setIsLoading:(state)=>{
            state.isLoading = !state.payload
        },
        setAccountComponentsMsg: (state, {payload})=>{
            state.accountComponentsMsg = {...state.accountComponentsMsg, payload}
        }
    },
    extraReducers:{
        [getProducts.pending]: (state)=>{
            state.isLoading = true
        },
        [getProducts.fulfilled]: (state, action)=>{
            state.products = action.payload?.data?.products
            if(action.payload){
                state.isLoading = false
            }
        },
        [getProducts.rejected]: (state)=>{
            state.isLoading = false
        },

        
        [signInUser.pending]: (state, action)=>{
            state.isSigninLoading = true
        },
        [signInUser.fullfiled]: (state, action)=>{
            const user = action.payload.user
            state.isSigninLoading = false
            state.signedIn = action.payload.user
            state.isFulfilledLoading = false
            state.accountComponentsMsg = {...state.accountComponentsMsg, user:{name:user.name, role:user.role, userId: user.userId}}
        },
        [signInUser.rejected]: (state, action)=>{
            state.isSigninLoading = false
        }
    }
})

export const {
    setSubCategoryIndex,
    setOpenSubCategory,
    setWindowWidth,
    setFirstRowSectionWidth,
    setIsLoading,
    setAccountComponentsMsg
} = homeSlice.actions

export default homeSlice.reducer