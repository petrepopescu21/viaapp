const pkg = require('./package')


module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', crossorigin: 'anonymouse', href: 'https://use.fontawesome.com/releases/v5.8.1/css/all.css', integrity: 'sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/moment'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    },
    parallel: true
  },

  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || "0.0.0.0",
    cb: "http://localhost:3000",
    mongo: process.env.DBCONN || "mongodb://rhdb:lvHCIGov4Dm8qtfvGxvXGSgcWY4IQpAtbKON1YiSTXxBe3E3mPyQhHc3ld77OCOSAA2Jcm4hfm1vF8lNRMMA1A%3D%3D@rhdb.documents.azure.com:10255/rhdb?ssl=true",
    facebook: {
      id: process.env.F_ID || "258376518447235",
      secret: process.env.F_SECRET || "6802812ecc92007c1b50529a0ce4c4c8"
    },
    google: {
      id: process.env.G_ID || "",
      secret: process.env.G_SECRET || "",
      mapskey: process.env.GMAPS_KEY || "AIzaSyC6oEh-GSdwGkWJj9JqEDF-FgqR6nAPGVc"
    },
    api: {
      url: process.env.APIURL || 'https://rhbackendapi.azurewebsites.net/api',
      key: process.env.APIKEY || '12345'
    }
  }
}
