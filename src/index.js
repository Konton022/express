const express = require('express');  
const { ApolloServer } = require('apollo-server-express');
require('dotenv').config(); 

const db = require('./db');
const models = require('./models/index')
const typeDefs = require('./schema')
// Запускаем сервер на порте, указанном в файле .env, или на порте 4000  
const port = process.env.PORT || 4000;
// Сохраняем значение DB_HOST в виде переменной  
const DB_HOST = process.env.DB_HOST;

// Предоставляем функции распознавания для полей схемы   
const resolvers = require('./resolvers/index')
const app = express();

// Подключаем БД   
db.connect(DB_HOST);

// Настраиваем Apollo Server  
const server = new ApolloServer({ typeDefs, resolvers, context: ()=> {
    return {models}
} });  
// Применяем промежуточное ПО Apollo GraphQL и указываем путь к /api

server.start().then(res => {
    server.applyMiddleware({ app, path: '/api' });
    app.listen({ port }, () => 
    console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`)
    );  
  });
