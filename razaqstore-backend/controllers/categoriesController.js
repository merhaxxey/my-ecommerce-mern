const Categories = require('../model/Categories')
const CustomError = require('../errors')
const {StatusCodes} = require('http-status-codes')

const getAllCatergories = async(req, res)=>{
    const categories = await Categories.find({})
    res.status(StatusCodes.OK).json({count:categories.length, categories})
}
const getSingleCatergory = async(req, res)=>{
    const {id:categoryId} = req.params

    const category = await Categories.findOne({_id:categoryId})

    if(!category){
        throw new CustomError.NotFoundError(`No category found with id - ${categoryId}`)
    }

    res.status(StatusCodes.OK).json({category})
}
const createCatergory = async(req, res)=>{
    const {index, name, items} = req.body
    if(!index || !name || !items){
        throw new CustomError.BadRequestError('please provide all credentials')
    }
    const category = await Categories.create({index, name, items})
    res.status(StatusCodes.CREATED).json({category})
}
const updateCatergory = async(req, res)=>{
    const {id:categoryId} = req.params
    

    const category = await Categories.findOneAndUpdate({_id:categoryId}, {...req.body}, {
        new: true,
        runValidators: true
    })

    if(!category){
        throw new CustomError.NotFoundError(`No category found with id - ${categoryId}`)
    }

    res.status(StatusCodes.OK).json({category})
}
const deleteCatergory = async(req, res)=>{
    const {id:categoryId} = req.params

    const category = await Categories.findOneAndDelete({_id:categoryId})

    if(!category){
        throw new CustomError.NotFoundError(`No category found with id - ${categoryId}`)
    }

    res.status(StatusCodes.OK).json({msg: 'category deleted successfully'})
}

module.exports = {
    getAllCatergories,
    getSingleCatergory,
    createCatergory,
    updateCatergory,
    deleteCatergory
}