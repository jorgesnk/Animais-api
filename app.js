
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


//user routers
server.delete('/api/user/:id',user.deleta);
server.get('/api/user/:id',user.find);
server.post('/api/user/create', user.cadatro);
server.post('/api/user/singUp',user.singup);
server.put('/api/user',user.edita);


server.use(jwt({ secret: 'segredo',}))


db.connection.on('connected', () => {
    server.listen(api.api, function () {
        console.log('servidor rodando na porta:' + api.api);
    });
})