const { gql } = require('apollo-server-express');

// Строим схему с помощью языка схем GraphQL
module.exports = gql`
    scalar DateTime

    type User {
        id: ID!
        username: String!
        email: String!
        avatar: String
        notes: [Note!]!
    }
    type Note {
        id: ID!
        content: String!
        author: String!
        createdAt: DateTime!
        updatedAt: DateTime!
    }
    type Query {
        notes: [Note!]!
        note(id: ID!): Note!
    }
    type Mutation {
        newNote(content: String!, author: String!): Note!
        updateNote(id: ID!, content: String!, author: String): Note!
        deleteNote(id: ID!): Boolean!
        signIn(username:String, email:String, password:String!):String!
        signUp(username: String!, email: String!, password:String!):String!
    }
`;
