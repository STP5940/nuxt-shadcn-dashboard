import { defineStore } from 'pinia'
// นำเข้า cookiesStorage จาก plugin ที่เราสร้าง
import { cookiesStorage } from '~/plugins/pinia-cookies-persist'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    accessToken: null,
    refreshToken: null,
    user: null,
  }),

  getters: {
    isAdmin: (state) => state.user?.role === 'admin',
    userName: (state) => state.user?.username || 'Guest'
  },

  actions: {
    async login(credentials) {
      // const { data, error } = await useFetch('/api/auth/login', {
      //   method: 'POST',
      //   body: credentials
      // })

      if (credentials) {
        // ใส่ข้อมูลจากการ login ลง pinia
        this.$patch({
          isLoggedIn: true,
          accessToken: "accessToken",
          refreshToken: "refreshToken",
          user: {
            UserId: "2025041000001",
            firstname: "John",
            lastname: "wick",
            username: "Johnwick123",
            role: "admin",
          },
        })
      }
    },

    async logout() {
      // รีเซ็ต state
      this.$reset()

      // ลบ cookie
      useCookie('auth-store').value = null
      navigateTo('/login')
    },

    async refreshTokenAction() {
      if (!this.refreshToken) throw new Error('No refresh token')

      // จำลองการเรียก API
      // const { data } = await useFetch('/api/auth/refresh', {
      //   method: 'POST',
      //   body: { refreshToken: this.refreshToken }
      // })

      this.accessToken = "accessToken2"
      return this.accessToken
    },

    async initialize() {
      const token = useCookie('auth-store').value
      if (!token) return
      // console.log("token: ", token);

      this.$patch({
        isLoggedIn: true,
        accessToken: token?.accessToken
      });
    }
  },

  persist: {
    storage: cookiesStorage({
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7 // 7 วัน
    }),
    key: 'auth-store',
    paths: [
      'isLoggedIn',
      'accessToken',
      'refreshToken',
      'user',
    ]
  }
})