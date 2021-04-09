const Product = require('../schema/product')
const Moment = require('moment')
const fs = require('fs')
const helpers = require('./helpers')

module.exports = {
    reviewProducts: async () => {
        // Check if there is atleast one product in database
        const oneProduct = await Product.findOne()
        if (!oneProduct) {
            // Get the json file and create new products
            let data = fs.readFileSync('./product.json')
            data = JSON.parse(data)
            const products = data.products
            for (let i = 0; i < products.length; i++) {
                const newProduct = new Product({
                    name: products[i].name,
                    description: products[i].description,
                    imageurl: products[i].imageurl,
                    categories: products[i].categories,
                    vendor: products[i].vendor,
                    active: products[i].active
                })
                await newProduct.save()
            }
        }
    },
    getProducts: async () => {
        // Get the products from products database
        // Get 20 random products
        const numOfDocs = await Product.countDocuments()
        const skip = helpers.getRandomInt(1, numOfDocs)
        const products = await Product.find().limit(10).skip(skip)
        const objectProducts = products.map(p => p._doc)
        objectProducts.forEach(p => {
            p.createdAt = Moment(p.createdAt).format("MMM Do YY");
        })
        return objectProducts
    },
    getFeaturedProduct: async () => {
        // Get a random product
        const numOfDocs = await Product.countDocuments()
        const skip = helpers.getRandomInt(1, numOfDocs)
        const products = await Product.find().limit(1).skip(skip)
        const objectProducts = products.map(p => p._doc)
        objectProducts.forEach(p => {
            p.createdAt = Moment(p.createdAt).format("MMM Do YY");
        })
        return objectProducts[0]
    }
}