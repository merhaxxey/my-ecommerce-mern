import React from 'react'
import {useSelector} from 'react-redux'

let prevKey = ''
let topValue = 0
let leftValue = 0

const SubCategory = React.memo(({openSubCategory})=>{
    const {categories, subCategoryIndex} = useSelector((store)=> store.home)

    return <section id="subCategories" className='sub-categories'>
        <article className='sub-categories-article'>{
            Object.keys(categories[subCategoryIndex].items).map((key, index)=>{
    
            if(index>0){
                topValue += (33 + (22* categories[subCategoryIndex].items[prevKey].length))

                const currentKeyHeight= (25 + (22* categories[subCategoryIndex].items[key].length))
                if((topValue + currentKeyHeight)>340){
                topValue = 0
                leftValue += 210
                }
            }
            const cssStyle={
                top: `${topValue===0? 5: topValue}px`,
                left: `${leftValue}px`
            }
            return <ul className='sub-categories-ul' style={cssStyle}>
                {
                    categories[subCategoryIndex].items[key].map((item, subIndex)=>{
                        prevKey = key
                        if(Object.keys(categories[subCategoryIndex].items).length === (index+1)){
                            topValue= 0
                            leftValue=0
                        }
                        return <>
                            {subIndex===0 && <h3 className='subCategories-h3'>
                                <a className='subCategories-h3-a' href="/sub-category">{key}</a>
                            </h3>}
                            <li className='subCategories-li'>
                                <a className='subCategories-li-a' href="/categories/items">{item}</a>
                            </li>
                        </>
                    })
                }
            </ul>
            })
        }</article>
    </section>
}
)
export default SubCategory