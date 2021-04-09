const { expect } = require('chai')
const resolvers = require('../graphql/resolvers');
const mongoose = require('mongoose')

describe('GraphQl resolvers', () => {
    before(function (done) {
        mongoose.connect('mongodb://localhost:27017/logarn', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useCreateIndex: true
        }).then(() => {
            done()
        })
    })

    it("should get products without errors", function (done) {
        resolvers.getProducts().then(products => {
            expect(products).to.be.an('array')
            done()
        })
    })
})
