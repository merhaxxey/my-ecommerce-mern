import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import { API_URL } from '../../ApiUrl'

const initialState = {
    displayCloseAccount: false,
    displayViewMore: '',
    isLoading: true,
    currentUser: {},
    googleLoginDetails: {},
    message: '',
    displayBtnContent: window.innerWidth<=962? '': 'account'
}

export const getUser = createAsyncThunk('profile/getCurrentUser', async()=>{
    try{
        const currentUser = await axios.get(`${API_URL}/api/v1/profile/showMe`, {withCredentials: true})
        console.log('-----------------------------------', currentUser)

        return currentUser
    }
    catch(error){
        console.log(error)
    }
})


const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setDisplayCloseAccount: (state, action)=>{
            state.displayCloseAccount = action.payload
        },
        setGoogleLoginDetails: (state, action)=>{
            state.googleLoginDetails = action.payload
        },
        setDisplayViewMore: (state, action)=>{
            state.displayViewMore = action.payload
        },
        setDisplayBtnContent: (state, action)=>{
            state.displayViewMore = action.payload
        }
    },
    extraReducers: {
        [getUser.pending]:(state, action)=>{
            state.isLoading = true
        },
        [getUser.fulfilled]:(state, action)=>{
            state.isLoading = false
            if(!action.payload?.data){
                state.isLoading = true
                state.message = 'err'
                state.currentUser = {}
            }
            state.currentUser = action.payload.data.user
        },
        [getUser.rejected]:(state, action)=>{
            state.isLoading = false
        }
    }

})

export const {setDisplayCloseAccount, setDisplayViewMore, setDisplayBtnContent, setGoogleLoginDetails} = profileSlice.actions
export default profileSlice.reducer