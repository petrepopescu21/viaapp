var axios = require('axios')
var config = require("../../nuxt.config")

const a = axios.create({
    baseURL: config.server.api.url,
    headers: {
        'key': config.server.api.key
    }
})

module.exports = {
    sendLocation(id,pos) {
        a.patch('/users',{
            _id: id,
            lat: pos.lat,
            longit: pos.lng
        })
    }
}