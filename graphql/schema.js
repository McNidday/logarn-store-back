// const { buildSchema } = require('graphql')
// module.exports = buildSchema(`
//     type Product {
//         _id: ID!
//         name: String!
//         description: String!
//         imageurl: String!
//         categories: []
//         vendor: String!
//         active: Boolean!
//         created_at: String!
//     }

//     type RootQuery {
//         getProducts(): [Products!]!
//     }

//     schema {
//         query: RootQuery
//     }
// `)

const { buildSchema } = require('graphql')
module.exports = buildSchema(`
     type Product {
         _id: ID!
         name: String!
         description: String!
         imageurl: String!
         categories: [String]
         vendor: String!
         active: Boolean!
         createdAt: String!
     }

    type RootQuery {
        getProducts: [Product!]!
        getFeaturedProduct: Product!
    }

    schema {
        query: RootQuery
    }
`)

