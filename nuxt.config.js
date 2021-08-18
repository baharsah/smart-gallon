import colors from 'vuetify/es5/util/colors'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  ssr: false,

  server: {
    port: 8000, // default: 3000     
    host: '0.0.0.0', // default: localhost   
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - SmartGallon',
    title: 'Smart Gallon',
    htmlAttrs: {
      lang: 'id'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: "AIzaSyBIcKN84z4Qtjt2N50vocPpVnlCiwXCMM8",
          authDomain: "smart-gallon.firebaseapp.com",
          databaseURL: "https://smart-gallon-default-rtdb.asia-southeast1.firebasedatabase.app",
          projectId: "smart-gallon",
          storageBucket: "smart-gallon.appspot.com",
          messagingSenderId: "212616565107",
          appId: "1:212616565107:web:a6e80e4a46a93a18d6f506"
        },
        services: {
          database: true,
        },
        database: {
          emulatorPort: 9000,
          emulatorHost: 'localhost',
        }
      }
    ],
    [
      '@nuxtjs/pwa',
    ],
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: '#47B9FF',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: '#47B9FF',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  pwa: {
    manifest: {
      name: 'Smart Gallon',
      short_name: 'Gallon IoT',
      description: 'Aplikasi pengingat dan monitoring galon.',
      display: 'standalone',
      theme_color: '#47b9ff',
      background_color: '#ffffff',
      // icons: [],
      lang: 'id',
      start_url: '/'
    },
    meta: {
      charset: 'utf-8',
      name: 'Smart Gallon',
      description: 'Aplikasi pengingat dan monitoring galon.',
      theme_color: '#47b9ff',
      author: 'Nabilla',
      lang: 'id',
      mobileAppIOS: 'false',
      nativeUI: 'true',
    }
  },
}
