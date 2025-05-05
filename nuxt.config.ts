// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devServer: {
    host: '0.0.0.0',
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000, // เปลี่ยนพอร์ตตามต้องการ
    https: false // หรือ true ถ้าต้องการ HTTPS
  },

  runtimeConfig: {
    public: {
      env: process.env.NUXT_PUBLIC_ENV || '',
      apiUrl: process.env.NUXT_PUBLIC_API_URL || '',
      appName: process.env.APP_NAME || 'MyApp',
      companyName: process.env.COMPANY_NAME || 'COMPANY',
    }
  },

  nitro: {
    devProxy: {
      host: 'localhost',
    },
  },

  devtools: { enabled: true },

  modules: [
    '@unocss/nuxt',
    'shadcn-nuxt',
    '@vueuse/nuxt',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
  ],

  css: [
    '@unocss/reset/tailwind.css',
  ],

  colorMode: {
    classSuffix: '',
  },

  features: {
    // For UnoCSS
    inlineStyles: false,
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  routeRules: {
    '/components': { redirect: '/components/accordion' },
    '/settings': { redirect: '/settings/profile' },
  },

  imports: {
    dirs: [
      './lib',
    ],
  },

  i18n: {
    // ตั้งค่าพื้นฐาน
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.json'
      },
      {
        code: 'th',
        name: 'ภาษาไทย',
        file: 'th.json'
      }
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'th',
    strategy: 'no_prefix', // หรือ 'prefix', 'prefix_and_default', 'no_prefix', 'prefix_except_default'
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },

  compatibilityDate: '2024-12-14',
})
