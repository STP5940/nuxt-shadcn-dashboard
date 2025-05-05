// plugins/pinia-cookies-persist.js
import { defineNuxtPlugin } from '#app'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// สร้างเป็น module export เพื่อให้นำเข้าได้โดยตรง
export const cookiesStorage = (options = {}) => {
    return {
        getItem: (key) => {
            return useCookie(key, options).value || null
        },
        setItem: (key, value) => {
            useCookie(key, options).value = value
        },
        removeItem: (key) => {
            useCookie(key, options).value = null
        }
    }
}

export default defineNuxtPlugin(({ $pinia }) => {
    $pinia.use(piniaPluginPersistedstate)
})