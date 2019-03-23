const passport = require('passport')
const User = require('./models/User')
let config = require('../nuxt.config')
const FacebookStrategy = require('passport-facebook')

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new FacebookStrategy({
    clientID: config.server.facebook.id,
    clientSecret: config.server.facebook.secret,
    callbackURL: `${config.server.cb}/auth/facebook/callback`,
    profileFields: ['id', 'first_name', 'last_name', 'picture.type(large)', 'email'],
},
    function (accessToken, refreshToken, profile, cb) {
        User.findOne({ 'email': profile.emails[0].value }).then(u => {
            // console.log(profile)
            if (u == null) {
                var x = new User({
                    registered: false,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: profile.emails[0].value,
                    thumb: profile.photos[0].value,
                    phoneNumber: "",
                    isAdmin: false,
                    accountType: -1
                })
                x.save()
                return cb(null, x)
            }
            return cb(null, u)
        }).catch(err => {
            return cb(err)
        })

    }
));

module.exports = passport