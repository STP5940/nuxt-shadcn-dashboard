export default defineNuxtRouteMiddleware(async (to, from) => {
    const auth = useAuthStore();
    const publicRoutes = ['/login', '/register', '/forgot-password']

    await auth.initialize()

    // ถ้า login แล้วไปหน้าแรก
    if (auth.isLoggedIn && to.path !== '/') {
        return navigateTo('/');
    }

    // ถ้าไม่ได้ล็อกอิน ให้ redirect ไปหน้า login
    // ตรวจสอบสิทธิ์การเข้าถึง
    if (!auth.isLoggedIn && !publicRoutes.includes(to.path)) {
        return navigateTo('/login')
    }

    // หรือกำหนด redirect ด้วย path ปลายทาง
    if (to.path === '/admin' && !auth.isAdmin) {
        return abortNavigation("คุณไม่มีสิทธิ์เข้าถึงหน้านี้")
    }
})