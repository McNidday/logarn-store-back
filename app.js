require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql')


const graphqlSchema = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')

const app = express()
app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: resolvers,
    graphiql: true,
    customFormatErrorFn(err) {
        if (!err.originalError) {
            return err
        }
        const data = err.originalError.data
        const message = err.message || "An error"
        const code = err.originalError.code || 500
    }
}))

app.use((error, req, res, next) => {
    console.log(error, 'Errrrroooooooooorrrrrrroooooo');
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(async () => {
    // Review Products
    await resolvers.reviewProducts()
    // Connect to port
    app.listen(8080)
    console.log('Ready sir mknidday')
})