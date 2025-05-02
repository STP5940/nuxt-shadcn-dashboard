<script setup lang="ts"></script>

<template>
  <SidebarProvider>
    <!-- <LayoutAppSidebar /> -->
    <SidebarInset>
      <!-- เปลี่ยน LayoutNavigationMenu ให้เป็น fixed top -->
      <div class="fixed top-0 left-0 right-0 z-50">
        <LayoutNavigationMenu />
      </div>

      <!-- เพิ่ม padding-top เพื่อไม่ให้เนื้อหาถูกเมนูทับ -->
      <div class="pt-14">
        <LayoutHeader class="pl-4 lg:pl-6" />
        <!-- ปรับค่าตามความสูงของเมนูของคุณ -->
        <div class="min-w-0 w-full flex-1 overflow-x-auto p-4 lg:p-6">
          <slot />
        </div>
      </div>

      <!-- <LayoutHeader />
      <div class="min-w-0 w-full flex-1 overflow-x-auto p-4 lg:p-6">
        <slot />
      </div> -->
    </SidebarInset>
  </SidebarProvider>
</template>

<style scoped></style>
