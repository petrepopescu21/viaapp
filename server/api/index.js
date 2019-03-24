var axios = require('axios')
var express = require('express')
var api = express.Router()
var config = require("../../nuxt.config")

const io = require('../index')


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
    // console.log(req.path)
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

api.post('/requests',(req,res)=>{
    a.post('/helprequests',req.body).then(response=>{
        res.send(response.data)
    })
})

api.post('/requests/apply',(req,res)=>{
    a.post('/helprequestregistrations',req.body).then(response=>{
        res.send(response.data)
    })
})

api.post('/requests/accept',(req,res)=>{
    a.patch('/helprequestregistrations',req.body).then(response=>{
        res.send(response.data)
    })
})

api.post('/users/:id/requests',(req,res)=>{
    a.put('/helprequestregistrations',{
        _userId: req.params.id,
        accountType: req.body.accountType
    }).then(response=>{
        res.send(response.data)
    }).catch(err=>{
        console.log(err)
        res.status(400)
        res.send("Bad request")
    })
})

api.get('/requests/:id',(req,res)=>{
    // console.log(req.params)
    a.get(`/helprequests/${req.params.id}`).then(response=>{
        res.send(response.data)
    }).catch(err=>{
        res.status(404)
        res.send(err)
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
api.get('/geocode/:latlng',(req,res)=>{
    gc.reverseGeocode({
        latlng: req.params.latlng,
        result_type: ['premise','establishment']
    }).asPromise().then(response=>{
        res.send(response)
    }).catch(err=>{
        res.status(400)
        res.send(err)
    })
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