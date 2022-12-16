import React,{useState, useEffect, useRef} from 'react'
import './Specification.css'

const Specification = ({product})=>{
    const [specList, setSpecList] = useState( Object.keys(product.specifications) )
    const [prodSpec, setProdSpec] = useState(product.specifications)
    return <article id="specifications-id" className='specifications'>
        {
            specList.map((item, index)=>{
                if(Array.isArray(prodSpec[item])){
                    return <ul className='listed-from-array'>
                        <h3>{item.split('_').join(' ')}</h3>



                        {prodSpec[item].map((item, index)=>{
                            return <li >{item}</li>
                        })}
                    </ul>
                }
                if(typeof prodSpec[item] === 'object'){
                    return <ul className='listed-from-object'>
                        <h3>{item.split('_').join(' ')}</h3>
                        
                        {Object.keys(prodSpec[item])
                            .map((key, index)=>{
                                return <li>
                                    <span className='specification-key'>{key}: </span>
                                    <span className='specification-values'>{prodSpec[item][key]}</span>
                                </li>
                            })
                        }
                    </ul>
                }
            })
        }
    </article>
}
export default Specification