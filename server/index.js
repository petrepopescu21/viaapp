const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const passport = require('./auth')
const http = require('http')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const api = require('./api')
const socket = require('socket.io')
const s = require('./api/socketHandlers')
const app = express()
const server = http.createServer(app)
const io = socket(server)

app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')
config.serverOnly = (process.env.SERVER_ONLY === 'true')

async function start() {

  const nuxt = new Nuxt(config)
  const { host, port } = nuxt.options.server
  // Init Nuxt.js
  if (config.serverOnly) {
    host = config.server.host
    port = config.server.port
  }

  // Build only in dev mode
  if (!config.serverOnly)
    if (config.dev) {
      const builder = new Builder(nuxt)
      await builder.build()
    } else {
      await nuxt.ready()
    }


  app.get('/auth/facebook', passport.authorize('facebook', { scope: ['email'] }));
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
      console.log(req.user)
      // Successful authentication, redirect home.
      res.redirect('/');
    });

  function ensureAuth(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    else {
      res.redirect('/login')
    }
  }

  app.all('*', (req, res, next) => {
    if (req.path == "/login" || req.path.match('assets'))
      next()
    else
      ensureAuth(req, res, next)
  })

  app.use('/api', api)
  // Give nuxt middleware to express
  if (!config.serverOnly) {
    app.use(nuxt.render)
  }

  if (config.serverOnly) {
    console.log("Server Only")
    app.use((req, res) => {
      res.send(req.headers)
    })
  }
  // Listen the server
  server.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })

  io.on('connection', (socket) => {
    
    var room = null
    if(socket.handshake.query.user.accountType == 0)
      room = "users"
    else
      room = "volunteers"

    socket.join(room)

    socket.on('location',function(data){
      s.sendLocation(data.user, data.pos)
    })

    socket.on('newrequest',function(data){
      socket.to('volunteers').emit('newrequestreceived',data)
    })
    // socket.on('location', function (fn) {
    //   console.log('location Update')
    // })
    // socket.on('last-messages', function (fn) {
    //   fn(messages.slice(-50))
    // })
    // socket.on('send-message', function (message) {
    //   messages.push(message)
    //   socket.broadcast.emit('new-message', message)
    // })
  })
}

start()
