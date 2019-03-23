var axios = require('axios')
var express = require('express')
var api = express.Router()
var config = require("../../nuxt.config")
const gc = require('@google/maps').createClient({
    key: config.server.google.mapskey,
    Promise: Promise
  });

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

api.get('/requests/:lat/:lng',(req,res)=>{
    a.get(`/helprequests/${req.params.lat}/${req.params.lng}`).then(response=>{
        res.send(response.data)
    })
})

api.get('/map',(req,res)=>{
    axios.get(`https://maps.googleapis.com/maps/api/js?key=${config.server.google.mapskey}`)
})

api.get('/geocode/:addr/:latlng',(req,res)=>{
    gc.placesNearby({
        location: `${req.params.latlng}`,
        keyword: req.params.addr,
        radius: 12000
    }).asPromise().then(response=>{
        res.send(response)
    }).catch(err=>{
        res.status(400)
        res.send(err)
    })
})

module.exports = api