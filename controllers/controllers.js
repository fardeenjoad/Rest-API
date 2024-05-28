const { query } = require('express')
const User = require('../models/schema')

const getAllProducts = async (req, res) => {
    const {company, name, featured, sort, select} = req.query;
    const queryObject = {};

    if(company){
        queryObject.company = company;
    }

    if(featured){
        queryObject.featured  = featured;
    }

    if(name){
        queryObject.name = { $regex:name, $options:"i"}
    }
    
    let apiData = User.find(queryObject)

    if(sort) {
        let sortFix = sort.split(",").join(" ")
        apiData = apiData.sort(sortFix)
    }

    if (select){
        let selectFix = select.split(",").join(" ")
        
        apiData = apiData.select(selectFix)
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 3;

    let skip = (page - 1) * limit;
    apiData = apiData.skip(skip).limit(limit)

    console.log(queryObject);

    const users = await apiData;
    res.status(200).json({users, nbHits: users.length})
}

const getAllProductsTesting = async(req, res) => {
    const users = await User.find(req.query).select("name price")
    console.log(query);
    res.status(200).json({users})
}

module.exports = { getAllProducts, getAllProductsTesting }
