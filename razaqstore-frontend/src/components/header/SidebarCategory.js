import CloseIcon from '@mui/icons-material/Close';
import React,{useState, useEffect} from 'react'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import './SidebarCategory.css'
import {useNavigate} from 'react-router-dom'
import { setToggleSidebar } from '../../features/header/headerSlice';
import {useDispatch, useSelector} from 'react-redux'

const SidebarCategory = ({payload})=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {categories} = useSelector((store)=> store.home)
    const {user} = useSelector((store)=> store.header)
    const [hovering, setHovering] = useState(100)


    return <aside className={`${payload}Wrapper`}>
        <span id={`${payload}Close-id`} className={`${payload}Close`} onClick={()=> dispatch(setToggleSidebar())}><CloseIcon className={`close-sidebar`}/></span>
        <section className={`sidebar-wrapper ${payload}`}>
            <article className='sidebar-header'>
                <h2>Browse products from categories</h2>
                <a href='/profile/account' type='button' className='sidebar-signin'>
                    <span>{`Hi, ${user?.name? user.name.split(' ')[0]: 'Sign in'}`}</span>
                    <PersonOutlineIcon/>
                </a>
            </article>
            <article className='sidebar-categories'>
                {categories.map((item, index)=>{
                    return (
                        <a
                            className={`sidebar-category sidebar-category${index} ${hovering===index? 'sidebar-category-onHover': ''}`}
                            onMouseOver={()=> setHovering(index)} 
                            onMouseOut={()=> setHovering(100)}
                            href={`/categories/${index+1}`}
                        >
                            <span className='text'>{item.name}</span>
                            <span className='icon'>{item.icon}</span>
                        </a>
                    )})}
            </article>
        </section>
    </aside>
}
export default SidebarCategory