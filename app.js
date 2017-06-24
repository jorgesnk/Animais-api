
const http = require('http')
const express = require('express')
const db = require('./db')
const api = require('./const/api')
const body = require('body-parser')
const cors = require('cors')
const jwt = require('express-jwt')


const server = express()
const user = require('./controllers/user');

server.use(body.json())
server.use(cors({
    origin: '*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}))

server.post('/', user.cadatro);
server.use(jwt({ secret: 'segredo' }))


db.connection.on('connected', () => {
    server.listen(api.api, function () {
        console.log('servidor rodando na porta:' + api.api);
    });
})