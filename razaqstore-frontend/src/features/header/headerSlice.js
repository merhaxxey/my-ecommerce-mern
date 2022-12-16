import {createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {API_URL} from '../../ApiUrl'

const initialState = {
    toggleSidebar: false,
    isLogoutLoading: true,
    user: {},
    accountChanges: true,
    msg: {},
}

export const getCurrentUser = createAsyncThunk('header/getCurrentUser', async()=>{
    try{
        const user = await axios.get(`${API_URL}/api/v1/user/showMe`, {withCredentials: true})
        console.log('user is here', user)
        return user
    }
    catch(error){
        
    }
})


export const logoutUser = createAsyncThunk('header/logoutUser' , async()=>{
    try{      
        const response = await axios.delete(`${API_URL}/api/v1/auth/logout`, {withCredentials: true})
        console.log(response)
        return response
    }catch(error){
        console.log(error)
    }
})


const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers:{
        setToggleSidebar: (state, action)=>{
            state.toggleSidebar = !state.toggleSidebar
        },
        setUser: (state, action)=>{
            state.user = action.payload
        }
    },
    extraReducers:{
        [getCurrentUser.pending]: (state)=>{
            state.isLoading = true
        },
        [getCurrentUser.fulfilled]: (state, action)=>{
            console.log(action)
            state.user = action.payload?.data?.user
            state.isLoading = false
            state.accountChanges = !state.accountChanges
        },
        [getCurrentUser.rejected]: (state)=>{
            state.isLoading = false
        },

        [logoutUser.pending]: (state, action)=>{
            state.isLogoutLoading = true
        },
        [logoutUser.fullfiled]: (state, action)=>{
            state.isLogoutLoading = false
            state.msg = action.payload
            state.user = {}
        },
        [logoutUser.rejected]: (state, action)=>{
            state.isLogoutLoading = false
        },

    }
})

export const {setToggleSidebar, setUser} = headerSlice.actions
export default headerSlice.reducer