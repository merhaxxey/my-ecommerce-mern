import React,{useState} from 'react'
import {visualCategory} from '../../../visualCategory'
import './VisualCategory.css'

const VisualCategory = ()=>{
    const [visualCategories, setVisualCategories] = useState(visualCategory)
  
    return <div className='visualCategories-wrapper'>
        <div className='visualCategories'>
            {visualCategories.map((item, index)=>{
            return <a href={`/categories/${index+1}`} className='visualCategory'>
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
            </a>
            })}
        </div>
    </div>
}
export default VisualCategory