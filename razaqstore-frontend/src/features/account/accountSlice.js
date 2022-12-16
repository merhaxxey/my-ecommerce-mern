import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import {API_URL} from '../../ApiUrl'

const initialState = {
  msg: {},
  isLoading: true,
  loggedIn: {}
}

export const logoutUser = createAsyncThunk('account/logoutUser' , async()=>{
    try{      
        const response = await axios.delete(`${API_URL}/api/v1/auth/logout`, {withCredentials: true})
        console.log(response)
        return response
    }catch(error){
        console.log(error)
    }
})

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducer: {
        setLoggedIn: (state, action)=>{
            state.loggedIn = action.payload
        }
    },
    extraReducers: {
        [logoutUser.pending]: (state, action)=>{
            state.isLoading = true
        },
        [logoutUser.fullfiled]: (state, action)=>{
            state.isLoading = false
            state.msg = action.payload
        },
        [logoutUser.rejected]: (state, action)=>{
            state.isLoading = false
        }
    }
})

export const {setLoggedIn} = accountSlice.actions
export default accountSlice.reducer