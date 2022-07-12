const {gql} = require('apollo-server-express')

// Строим схему с помощью языка схем GraphQL  
module.exports = gql`
        type Note {
            id: ID!
            content: String!
            author: String!
        }
        type Query {
            notes: [Note!]!
            note(id: ID!): Note! 
        }
        type Mutation {
            newNote(content: String!, author: String!): Note!
        }
`;  