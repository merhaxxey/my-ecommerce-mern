import React, {useState} from 'react'
import {resetProps} from '../../features/product/productSlice'
import {useSelector, useDispatch} from 'react-redux'

const CleanProductData = ({children})=>{
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const {product} = useSelector((store)=> store.product)
    
    if(Object.keys(product).length > 0){
        return dispatch(resetProps())
    }
    return children
}

export default CleanProductData