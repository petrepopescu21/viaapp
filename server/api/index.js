var axios = require('axios')
var express = require('express')
var api = express.Router()
var config = require("../../nuxt.config")

const a = axios.create({
    baseURL: config.server.api.url,
    headers: {
        'key': config.server.api.key
    }
})

api.all('*',(req,res,next)=>{
    console.log(req.path)
    next()
})

api.get('/users/:id',(req,res)=>{
    a.get(`/users/${req.params.id}`).then(response=>{
        res.send(response.data)
    }).catch(err=>{
        console.log(err)
        res.status(500)
        res.send("Error")
    })
})

api.post('/users',(req,res)=>{
    a.post("/users/",req.body).then(response=>{
        res.send(response.data)
    }).catch(err=>{
        console.log(err)
        res.status(500)
        res.send("Sumtin wong")
    })
})

module.exports = api