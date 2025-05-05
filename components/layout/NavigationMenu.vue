<script setup lang="js">
const { locales, setLocale } = useI18n();
const auth = useAuthStore();
const config = useRuntimeConfig()

import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { navItems } from '~/constants/navigationmenu'

import {
  Settings,
  Bell,
  User,
  HelpCircle,
  Menu,
  ChevronDown,
  ChevronRight,
  LogOut,
  Moon,
  Sun,
  Globe,
} from "lucide-vue-next";

const router = useRouter();
const route = useRoute();
const activeItem = ref(route.path);
const isMobileMenuOpen = ref(false);
const colorMode = useColorMode()

// Track open/closed state for dropdown menus
const openDropdowns = ref({
  projects: false,
  resources: false,
  settings: false,
  components: false,
});

// Toggle dropdown state
const toggleDropdown = (section) => {
  openDropdowns.value[section] = !openDropdowns.value[section];
};

// MenuItem logout
const logout = () => {
  auth.logout()
  router.push('/login');
};

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

// Update active item when route changes
watch(
  () => route.path,
  (newPath) => {
    activeItem.value = newPath;
    isMobileMenuOpen.value = false; // Close mobile menu on navigation
  }
);

// Add this function to prevent body scrolling when mobile menu is open
watch(isMobileMenuOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});
</script>

<template>
  <nav class="border-b bg-background sticky top-0 z-20 w-full">
    <!-- p-4 lg:p-6 -->
    <div class="flex h-14 items-center px-1 lg:px-5">
      <!-- Mobile menu button (hidden on desktop) -->
      <div class="mr-2 flex lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          class="rounded-full"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <Menu class="h-5 w-5" />
        </Button>
      </div>

      <!-- Logo and brand -->
      <div class="mr-4 flex items-center">
        <NuxtLink to="/" class="flex items-center">
          <img
            src="/logo.svg"
            :alt="`${config.public.appName} Logo`"
            class="h-8 w-auto"
          />
          <span class="font-bold text-xl ml-1">{{ config.public.appName }}</span>
        </NuxtLink>
      </div>

      <!-- Desktop Navigation (hidden on mobile) -->
      <NavigationMenu class="hidden lg:flex">
        <NavigationMenuList>
          <!-- Simple menu items -->
          <template v-for="(group, index) in navItems" :key="index">
            <!-- Items with direct links -->
            <template v-if="group.items">
              <NavigationMenuItem v-for="item in group.items" :key="item.title">
                <NuxtLink
                  :to="item.link"
                  :class="
                    item.link === activeItem ? 'bg-accent text-accent-foreground' : ''
                  "
                  class="px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground flex items-center"
                >
                  <component :is="item.icon" class="mr-2 h-4 w-4" />
                  {{ item.title }}
                </NuxtLink>
              </NavigationMenuItem>
            </template>

            <!-- Items with dropdown menus -->
            <template v-else-if="group.children">
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <component :is="group.icon" class="mr-2 h-4 w-4" />
                  {{ group.title }}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <!-- Dropdowns Projects -->
                  <ul
                    class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2"
                    v-if="group.title === 'Projects'"
                  >
                    <li v-for="item in group.children" :key="item.title">
                      <NuxtLink :to="item.link" custom v-slot="{ navigate }">
                        <a
                          @click="navigate"
                          class="block select-none space-y-1 rounded-md cursor-pointer p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div class="text-sm font-medium leading-none">
                            {{ item.title }}
                          </div>
                          <p
                            class="line-clamp-2 text-sm leading-snug text-muted-foreground"
                          >
                            {{ item.description }}
                          </p>
                        </a>
                      </NuxtLink>
                    </li>
                  </ul>

                  <!-- Dropdowns Resources -->
                  <ul
                    class="grid gap-3 p-6 w-[400px] md:w-[500px]"
                    v-else-if="group.title === 'Resources'"
                  >
                    <li class="row-span-3">
                      <NuxtLink to="/" custom v-slot="{ navigate }">
                        <a
                          @click="navigate"
                          class="flex h-full w-full select-none flex-col justify-end rounded-md cursor-pointer bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        >
                          <div class="mb-2 text-lg font-medium">Resources Hub</div>
                          <p class="text-sm leading-tight text-muted-foreground">
                            Access all the resources and documentation you need to succeed
                            with our platform.
                          </p>
                        </a>
                      </NuxtLink>
                    </li>
                    <li v-for="item in group.children" :key="item.title">
                      <NuxtLink :to="item.link" custom v-slot="{ navigate }">
                        <a
                          @click="navigate"
                          class="block select-none space-y-1 rounded-md cursor-pointer p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div class="flex items-center text-sm font-medium leading-none">
                            <component :is="item.icon" class="mr-2 h-4 w-4" />
                            {{ item.title }}
                          </div>
                          <p
                            class="line-clamp-2 text-sm leading-snug text-muted-foreground"
                          >
                            {{ item.description }}
                          </p>
                        </a>
                      </NuxtLink>
                    </li>
                  </ul>

                  <!-- Dropdowns Components -->
                  <ul
                    class="grid w-[860px] gap-1 p-6 md:grid-cols-4"
                    v-else-if="group.title === 'Components'"
                  >
                    <li v-for="item in group.children" :key="item.title">
                      <NuxtLink
                        :to="item.link"
                        custom
                        v-slot="{ navigate }"
                        :class="
                          item.link === activeItem
                            ? 'bg-accent text-accent-foreground'
                            : ''
                        "
                      >
                        <a
                          @click="navigate"
                          class="block select-none space-y-1 rounded-md cursor-pointer p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div class="text-sm font-medium leading-none flex items-center">
                            <component :is="item.icon" class="mr-2 h-4 w-4" />
                            {{ item.title }}
                            <span
                              v-if="item.new"
                              class="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline"
                            >
                              New
                            </span>
                          </div>
                        </a>
                      </NuxtLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </template>
          </template>
        </NavigationMenuList>
      </NavigationMenu>

      <div class="ml-auto flex items-center gap-2">
        <!-- ปุ่มแจ้งเตือน -->
        <!-- ซ้อนถ้าหน้าจอมือถือ -->
        <Button variant="ghost" size="icon" class="hidden lg:flex rounded-full">
          <Bell class="h-5 w-5" />
        </Button>

        <!-- ปุ่มเปลี่ยนธีม -->
        <Button variant="ghost" size="icon" class="rounded-full" @click="toggleTheme">
          <Moon
            class="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <Sun
            class="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
        </Button>

        <!-- Dropdown เปลี่ยนภาษา -->
        <DropdownMenu :modal="false">
          <DropdownMenuTrigger as-child>
            <!-- gap-1 -->
            <Button variant="ghost" class="rounded-full gap-2">
              <Globe class="h-5 w-5" />
              <span class="hidden sm:inline">
                {{ locales.find((l) => l.code === $i18n.locale)?.name || $t("language") }}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="mt-5 w-[99vw] sm:w-56">
            <DropdownMenuLabel>{{ $t("selectLanguage") }}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              v-for="locale in locales"
              :key="locale.code"
              @click="setLocale(locale.code)"
              :class="{
                'bg-accent text-accent-foreground': locale.code === $i18n.locale,
              }"
            >
              <span class="flex items-center gap-2">
                <Avatar class="h-5 w-5 border-1 border-gray-200 dark:border-gray-700">
                  <AvatarImage :src="`/${locale.code}.svg`" :alt="locale.name" />
                  <AvatarFallback>{{ locale.code }}</AvatarFallback>
                </Avatar>
                {{ locale.name }}
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <!-- Dropdown ผู้ใช้ -->
        <DropdownMenu :modal="false">
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="icon" class="rounded-full">
              <Avatar class="border-1 border-gray-200 dark:border-gray-700">
                <AvatarImage src="/unovue-preview.png" alt="@unovue" />
                <AvatarFallback>VUE</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="mt-5 w-[99vw] sm:w-56">
            <DropdownMenuLabel>บัญชีของฉัน</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <NuxtLink to="/settings/profile" class="flex items-center">
                <Settings class="mr-2 h-4 w-4" />
                <span>ตั้งค่า</span>
              </NuxtLink>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <NuxtLink to="/settings/profile" class="flex items-center">
                <User class="mr-2 h-4 w-4" />
                <span>โปรไฟล์</span>
              </NuxtLink>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem class="text-red-600" @click="logout()">
              <LogOut class="mr-2 h-4 w-4" />
              <span>ออกจากระบบ</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>

    <!-- Mobile menu (shown when isMobileMenuOpen is true) -->
    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isMobileMenuOpen"
        class="lg:hidden fixed top-14 left-0 right-0 bottom-0 bg-background border-b shadow-lg z-10"
      >
        <!-- Use ScrollArea component for better scrolling experience -->
        <ScrollArea class="h-full w-full">
          <div class="px-2 pt-2 pb-3 space-y-1">
            <!-- Mobile menu content wrapper -->
            <div class="pb-0">
              <!-- Add padding at the bottom for better scrolling experience -->
              <template v-for="(group, index) in navItems" :key="index">
                <!-- Simple items -->
                <template v-if="group.items">
                  <NuxtLink
                    v-for="item in group.items"
                    :key="item.title"
                    :to="item.link"
                    class="flex items-center px-3 py-2 my-1 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground"
                    :class="
                      item.link === activeItem ? 'bg-accent text-accent-foreground' : ''
                    "
                  >
                    <component :is="item.icon" class="mr-3 h-5 w-5" />
                    {{ item.title }}
                  </NuxtLink>
                </template>

                <!-- Dropdown items -->
                <template v-else-if="group.children">
                  <div class="px-0 py-2">
                    <button
                      @click="toggleDropdown(group.title.toLowerCase())"
                      class="w-full flex items-center justify-between text-base font-medium px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground"
                    >
                      <div class="flex items-center">
                        <component :is="group.icon" class="mr-3 h-5 w-5" />
                        {{ group.title }}
                      </div>
                      <component
                        :is="
                          openDropdowns[group.title.toLowerCase()]
                            ? ChevronDown
                            : ChevronRight
                        "
                        class="h-4 w-4 transition-transform"
                      />
                    </button>
                    <Transition
                      enter-active-class="transition duration-200 ease-out"
                      enter-from-class="transform scale-y-95 opacity-0"
                      enter-to-class="transform scale-y-100 opacity-100"
                      leave-active-class="transition duration-150 ease-in"
                      leave-from-class="transform scale-y-100 opacity-100"
                      leave-to-class="transform scale-y-95 opacity-0"
                    >
                      <div
                        v-if="openDropdowns[group.title.toLowerCase()]"
                        class="mt-2 pl-8 space-y-1 origin-top"
                      >
                        <NuxtLink
                          v-for="item in group.children"
                          :key="item.title"
                          :to="item.link"
                          class="block px-3 py-2 rounded-md text-sm hover:bg-accent hover:text-accent-foreground"
                          :class="{
                            'bg-accent text-accent-foreground': item.link === activeItem,
                          }"
                        >
                          {{ item.title }}
                          <span
                            v-if="item.new"
                            class="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline"
                          >
                            New
                          </span>
                        </NuxtLink>
                      </div>
                    </Transition>
                  </div>
                </template>
              </template>

              <div class="px-3 py-2 mt-4 border-t pt-4">
                <div class="flex items-center text-base font-medium">
                  <HelpCircle class="mr-3 h-5 w-5" />
                  Help & Support
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
/* Your existing styles here */
</style>
