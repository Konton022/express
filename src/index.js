const express = require('express');  
const { ApolloServer, gql } = require('apollo-server-express');
require('dotenv').config(); 

const db = require('./db');
const models = require('./models/index')
// Запускаем сервер на порте, указанном в файле .env, или на порте 4000  
const port = process.env.PORT || 4000;
// Сохраняем значение DB_HOST в виде переменной  
const DB_HOST = process.env.DB_HOST;
// const DB_HOST = "mongodb://185.7.116.186:27017/notedly" 


let notes = [
    { id: '1', content: 'This is a note', author: 'Adam Scott' },
    { id: '2', content: 'This is another note', author: 'Harlow Everly' },    
    { id: '3', content: 'Oh hey look, another note!', author: 'Riley Harrison' }
];

// Строим схему с помощью языка схем GraphQL  
const typeDefs = gql`
        type Note {
            id: ID!
            content: String!
            author: String!
        }
        type Query {
            hello: String!
            notes: [Note!]!
            note(id: ID!): Note! 
        }
        type Mutation {
            newNote(content: String!, author: String!): Note!
        }
`
;  
// Предоставляем функции распознавания для полей схемы   
const resolvers = {
                Query: {
                    hello: () => 'Hello world!',
                    notes: async ()=> {
                        return await models.Note.find()
                    },
                    note: async (parent, args) => {
                        return await models.Note.findById(args.id)
                    }    
                },
                Mutation: {
                    newNote: async (parent, args)=> {
                        return await models.Note.create({
                            content: args.content,
                            author: args.author
                        })
                    }
                }
};  
const app = express();

// Подключаем БД   
db.connect(DB_HOST);

// Настраиваем Apollo Server  
const server = new ApolloServer({ typeDefs, resolvers });  
// Применяем промежуточное ПО Apollo GraphQL и указываем путь к /api

server.start().then(res => {
    server.applyMiddleware({ app, path: '/api' });
    app.listen({ port }, () => 
    console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`)
    );  
  });
