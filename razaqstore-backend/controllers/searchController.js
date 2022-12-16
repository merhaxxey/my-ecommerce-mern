const Product = require('../model/Product')
const Category = require('../model/Categories')
const {StatusCodes} = require('http-status-codes')
const compare = require('../algorithms/searchEngine')
const sortObj = require('../algorithms/sortObj')
const CustomError = require('../errors')


const searchProduct = async(req, res)=>{
    const {q} = req.params

    if(!q){
        throw new CustomError.NotFoundError('No search string found')
    }

    console.log('search string', q)

    const names = []
    let productName,
        prouctSubCategory,
        productCategory, 
        rankValue = [],
        category
        
    for await (const doc of Product.find({})) {
        category = await Category.findOne({index: doc.categoryIndex})
        productName = doc.name
        productSubCategory = doc.category
        productCategory = category.name
        
        let tempValue = 0

        tempValue += compare(q, productName)>0? 1: 0
        tempValue += compare(q, productSubCategory)>0? 2: 0
        tempValue += compare(q, productCategory)>0? 3: 0

        if(tempValue !== 0){
            rankValue.push({...doc._doc, value:tempValue})
        }
    }
    
    const rankValueSorted = sortObj(rankValue)

    console.log(rankValueSorted)

    res.status(StatusCodes.OK).json({count:rankValueSorted.length, searchResult: rankValueSorted})
}

module.exports = {searchProduct}