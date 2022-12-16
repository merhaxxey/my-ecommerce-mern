
export const initialState={
    categories,
    subCategoryIndex: 0,
    openSubCategory: false,
    toggleSidebar: false,
    windowWidth: window.innerWidth,
    firstRowSectionWidth: 0,
    addItemsTocart: 0,
    product: {}
}

export const reducer = (state, action)=>{
    if(action.type==='subCategoryIndex'){
        return {...state, subCategoryIndex:action.value}
    }
    if(action.type==='openSubCategory'){
        return {...state, openSubCategory:action.value}
    }
    if(action.type==='setToggleSidebar'){
        return {...state, toggleSidebar:!state.toggleSidebar}
    }
    if(action.type==='setWindowWidth'){
        return {...state, windowWidth: window.innerWidth}
    }
    if(action.type==='setFirstRowSectionWidth'){
        return {...state, firstRowSectionWidth:action.value}
    }
    if(action.type === 'setAddItemsToCart'){
        return {...state, addItemsToCart:action.value}
    }
    if(action.type === 'setProduct'){
        console.log('------------------', action.value)
        return {...state, product:action.value}
    }
    
    return state
}