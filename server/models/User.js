var mongoose = require("mongoose")
var Schema = mongoose.Schema
let config = require('../../nuxt.config')
const connString = config.server.mongo
mongoose.connect(connString, {
    useNewUrlParser: false
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected to DB");
});

var userSchema = new Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String,
    email: String,
    thumb: String,
    registered: Boolean,
    accountType: Number,
    isAdmin: Boolean
})

userSchema.index({ email: 1 }, { unique: true })

module.exports = mongoose.model("Users", userSchema)
