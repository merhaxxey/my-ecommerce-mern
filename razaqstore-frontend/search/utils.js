export const getCompanies = (products)=>{
    let companiesArr = []
    products.map((product, index)=>{
        let found = companiesArr.find((item, index)=> item === product.brand)
        if(product.brand===""){
            companiesArr.push('No brand')
            return 
        }
        if(!found){
            companiesArr.push(product.brand)
        }
    })
    let found=false;
    
    return companiesArr.filter((item, index)=>{
        if(item==="No brand"){
            if(!found){
                found=true
                return true
            }

            return false
        }
        return true
    })

}

export const getMinMaxPrice = (products)=>{
    let price;
    return products.reduce((minmaxArr, item)=>{
        price = Math.floor(item.price - (item.price * (item.discount/100)))
        if((price < minmaxArr[0]) || (minmaxArr[0] === 0)){
            minmaxArr[0] = price
        }
        if(price > minmaxArr[1]){
            minmaxArr[1] = price
        }
        return minmaxArr
    }, [0,0])
}

