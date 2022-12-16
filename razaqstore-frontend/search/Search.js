import React,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import CurrencyFormat from 'react-currency-format'
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import {IoIosArrowForward} from 'react-icons/io'
import {FiMinus} from 'react-icons/fi'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Input } from '@mui/material';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import { createStyles, makeStyles } from "@mui/styles";
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import MinimumDistanceSlider from './MinimumDistanceSlider'
import SplitButton from './SplitButton'
import {useLocation} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {setDefaultFilterValues, setIsLoading, setProducts, searchProducts, setFormValue} from '../../features/search/searchSlice'
import Circular from '../progress/Circular'
import Footer from '../homepage/Footer'
import './Search.css'
import {getCompanies, getMinMaxPrice} from './utils';
import { filterUrl } from '../../utils';

function valuetext(value) {
    return `NGN${value}`;
}

function useQuery(){
    const url = useLocation()
    console.log(
        url.search.split('?q=') [1]
    )
    return url.search.split('?q=') [1]
}
    
let applyFilter = false;
let radioValue = 0

const Search = ()=>{
    const dispatch = useDispatch()
    const {search, formValue, products, defaultFilterValues} = useSelector((store)=> store.search)
    const {windowWidth} = useSelector((store)=> store.home)
    const [loading, setLoading] = useState(true)
    const [company, setCompany] = useState('')
    const [companies, setCompanies] = useState([])
    const [freeShipping, setFreeShipping] = useState(false)
    const [selectFocus, setSelectFocus] = useState(true)
    const [productPrice, setProductPrice] = useState({})
    const [productsToDisplay, setProductsToDisplay] = useState({})
    const [closeFilter, setCloseFilter] = useState(false)
    const [checkRadio, setCheckRadio] = useState({
        first: false,
        second: false,
        third: false,
        forth: false
    })
    const queryParam = useQuery()
    const boxRef = React.useRef(null)

    console.log(windowWidth)

    useEffect(()=>{
        dispatch(searchProducts(queryParam))
        console.log('in searchProducts useEffect', search)
    }, [search])

    useEffect(()=>{
        console.log('search', search)
    })

    useEffect(()=>{
        
        if(Object.keys(products).length !== 0){
            setLoading(false)
            let price;
            
            setCompanies(
                getCompanies(products)
            )
            
            const minmaxResult = getMinMaxPrice(products) 
            setProductPrice({min:minmaxResult[0], max:minmaxResult[1]})
            
            setProductsToDisplay(products)
            dispatch(setFormValue({min:minmaxResult[0], max:minmaxResult[1]}))
            dispatch(setDefaultFilterValues({...defaultFilterValues, formValue:{min:minmaxResult[0], max:minmaxResult[1]}}))
        }
    }, [products])

    useEffect(()=>{
        if(!applyFilter) return
        console.log('-------------------------------------------------')
        console.log(productsToDisplay)

        const minmaxResult = getMinMaxPrice(productsToDisplay) 
        applyFilter = false

        setProductPrice({min:minmaxResult[0], max:minmaxResult[1]})

    }, [productsToDisplay])

    useEffect(()=>{
        console.log(freeShipping)
    }, [freeShipping])

    const filterFormValue = (props)=>{
        if(('max' in props) && props.max < 0){
            return
        }
        if(('min' in props) && props.min < 0){
            return
        }
        dispatch(setFormValue({...formValue, ...props}))
    }

    const handleChange = (event) =>{
        setCompany(event.target.value);
    };

    const handleFilter = ()=> {
        const priceFilterValue = formValue

        let price;
        let newProducts = products.filter((item, index)=>{
            price = Math.floor(item.price - (item.price * (item.discount/100)))
            return ((price >= priceFilterValue.min) && (price <= priceFilterValue.max))
        })
        .filter((item, index)=> item.discount >= radioValue)
        .filter((item, index)=> {
            if(company === ''){
                return true
            }
            return item.company === company
        })
        if(freeShipping){
            newProducts = newProducts.filter((item, index)=> item.freeShipping)
            
        }

        applyFilter = true
        setProductsToDisplay(newProducts)
    } 
    console.log('windowWith', windowWidth)

    useEffect(()=>{
        handleFilter()
    }, [freeShipping])

    const handleClearFilter = ()=>{
        setCompany('')
        setFreeShipping(false)
         dispatch(setFormValue({min:defaultFilterValues.formValue.min, max:defaultFilterValues.formValue.max}))
        setProductsToDisplay(products)
        setCheckRadio({first: false, second: false, third: false, forth: false})
    }

    if(loading){
        return <Circular/>
    }

    if(products.length < 1){
        return <h2>No Poduct Found</h2>
    }

    return <main style={{backgroundColor: 'var(--mainBKColor)'}} className='search-container'>
        <main className={`${windowWidth<=962?'search-wrapper-mobile': 'search-wrapper'}`}>
            <section className={` ${closeFilter? 'filter-wrapper-mobile-open': 'filter-wrapper-mobile-close'} filters-wrapper ${windowWidth<=962 && 'filter-wrapper-mobile'}`} >
                {windowWidth<=962 && <div className='filter-nav'>
                    <IoIosArrowForward className='search-IoIosArrowForward' onClick={()=> setCloseFilter(false)} />
                    <h3>Filter</h3>
                </div>}
                <div className='filters'>
                    <article className="price">
                        <div className='title-bar'>
                            <span className='title'>Price</span>
                            {windowWidth<=962 || <button type='button' onClick={handleFilter} className=''>Apply</button>}
                        </div>

                        <MinimumDistanceSlider productPrice={defaultFilterValues} />
                        <div className='values-wrapper'>
                            <input id='minmaxInput1' type="number" onChange={(e)=> filterFormValue({min:e.target.value})} value={formValue.min}  />
                            <FiMinus className='fiminus'/>
                            <input id='minmaxInput2' type="number" onChange={(e)=> filterFormValue({max:e.target.value})} value={formValue.max} />
                        </div>
                    </article>
                    <FormControl className="discount-wrapper">
                        <FormLabel id="demo-radio-buttons-group-label">Disconut</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            >
                            <FormControlLabel value='40' control={<Radio checked={checkRadio.first} onClick={(e)=> {radioValue = e.target.value; setCheckRadio({first: !checkRadio.first, second: false, third: false, forth: false}); handleFilter(e)}} size={'small'} />} label="40% and more" />
                            <FormControlLabel value="30" control={<Radio checked={checkRadio.second} onClick={(e)=> {radioValue = e.target.value; setCheckRadio({first: false, second: !checkRadio.second, third: false, forth: false}); handleFilter(e)}} size={'small'} />} label="30% and more" />
                            <FormControlLabel value="20" control={<Radio checked={checkRadio.third} onClick={(e)=> {radioValue = e.target.value; setCheckRadio({first: false, second: false, third: !checkRadio.third, forth: false}); handleFilter(e)}} size={'small'} />} label="20% and more" />
                            <FormControlLabel value="10" control={<Radio checked={checkRadio.forth} onClick={(e)=> {radioValue = e.target.value; setCheckRadio({first: false, second: false, third: false, forth: !checkRadio.forth}); handleFilter(e)}} size={'small'} />} label="10% and more" />
                        </RadioGroup>
                    </FormControl>
                    <Box sx={{ minWidth: 120 }} className='company-container'>
                        <FormControl fullWidth>
                            <InputLabel ref={boxRef} className={selectFocus || 'select-label-after'} id="demo-simple-select-label">Company</InputLabel>
                            <Select
                                className='select'
                                size='small'
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={company}
                                label="Company"
                                onChange={handleChange}
                            >
                                {companies.map((item, index)=>{
                                    return <MenuItem id='menuItem' value={item}>{item}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                    <FormGroup id='checkbox'>
                        <FormControlLabel 
                            control={<Checkbox 
                                checked={freeShipping} 
                                onClick={()=>{
                                    setFreeShipping(!freeShipping)
                                }}
                            />} 
                            label="Free Shipping" />
                    </FormGroup>
                    
                    <button 
                        onClick={handleClearFilter}
                        id='clear-filter-btn'
                        type='button'
                    >Clear filters</button>
                </div>
                    
            </section>
            <section className={`product-list-wrapper ${productsToDisplay.length!==2 || 'product-list-wrapper-twoProducts'} ${productsToDisplay.length!==1 || 'product-list-wrapper-oneProducts'}`}>
                <div className='navbar'>
                    <span className='title'>{productsToDisplay.length} products found</span>
                    {windowWidth<=962 || <SplitButton />}
                </div>
                <article className={`${windowWidth<=962? 'product-list-mobile': 'product-list'} `}>
                    {productsToDisplay.map((item, index)=>{
                    let {img, name, price, sold, discount, freeShipping} = item
                    name = filterUrl(name)
                    return <Link to={`/product?name=${name}`} id="exploreStore-product-id" className={`exploreStore-product ${windowWidth<=962? 'search-product-mobile': 'search-product'} ${productsToDisplay.length!==2 || 'search-product-twoProducts'} ${productsToDisplay.length!==1 || 'search-product-oneProducts'}`}>
                        <img src={img[0]} alt='products image' />
                        <p id={'name-id'} className='name'>{name}</p>
                        <span className='discount'>
                            <span className='currency-name'>NGN</span><CurrencyFormat className='price-format' value={Math.ceil(price*((100-discount)/100))} displayType={'text'} thousandSeparator={true} />
                        </span>
                        {discount!==0
                        &&
                        <span className='price'>
                            <span className='currency-name'>NGN</span><CurrencyFormat className='price-format' value={price} displayType={'text'} thousandSeparator={true} />
                            <span className='discount-rate'>-{discount}%</span>
                        </span>}
                        <p className='sold'>{sold} sold</p>
                        {freeShipping && <p className='freeShipping'>Free shipping</p>}
                    </Link>
                    })}
                </article>
            </section>
        </main> 
        {windowWidth>962 || <div className='mobile-bottom-btn'>
            <button id='closeFilter' onClick={()=> setCloseFilter(true)} type='button'>Filter</button>
            <hr/>
            <SplitButton />
        </div>}

        <Footer/>
    </main>
}
export default Search   