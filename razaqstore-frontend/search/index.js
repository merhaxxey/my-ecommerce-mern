import React from 'react'
import Search from './Search'
import Search_Mobile from './Search_Mobile'
import {useSelector, useDispatch} from 'react-redux'

const SearchPage = ()=>{
    const {windowWidth} = useSelector((store)=> store.home)

    if(windowWidth>962){
        return <main style={{backgroundColor: 'var(--mainBKColor)'}}>
            <Search/>
        </main> 
    }
    if(windowWidth<=962){
        return <main style={{backgroundColor: 'var(--mainBKColor)'}}>
            <Search_Mobile/>
        </main> 
    }
}
export default SearchPage