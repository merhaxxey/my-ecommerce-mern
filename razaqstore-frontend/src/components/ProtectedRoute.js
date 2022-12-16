import React,{useEffect, useState} from 'react'
import axios from 'axios'
import CircularIndeterminate from './progress/Circular'
import {API_URL} from '../ApiUrl'

const ProtectedRoute = ({children})=>{
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)

    const getUser = async()=>{
        try{
            const user = await axios.get(`${API_URL}/api/v1/user/showMe`, {withCredentials: true})
            setUser(user?.data?.user)
            setLoading(false)
        }
        catch(error){
            console.log(error)
            setLoading(false)
        }
    }
    useEffect(()=>{
        getUser()
    }, [])

    if(loading){
        return <CircularIndeterminate/>
    }

    if(user?.name){
        return children
    }

    return <h3 style={{'text-align': 'center'}}>Unauthorized access</h3>
}

export default ProtectedRoute