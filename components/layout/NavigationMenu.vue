<script setup lang="js">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
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
import {
  LayoutDashboard,
  Album,
  Folder,
  CheckSquare,
  BarChart,
  Settings,
  Bell,
  User,
  FileText,
  Users,
  HelpCircle,
  Menu,
  Table,
  ChevronDown,
  ChevronRight,
  LogOut
} from "lucide-vue-next";

import { useRouter } from 'vue-router';

const router = useRouter();

// Nav items data
const navItems = {
  simple: [
    {
      title: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      title: 'Survey Request',
      href: '/surveyrequest',
      icon: Album
    },
    {
      title: 'Datatable',
      href: '/datatable',
      icon: Table
    },
  ],
  projects: [
    {
      title: "All Projects",
      href: "/",
      description: "View all your ongoing and completed projects.",
    },
    {
      title: "Create New",
      href: "/",
      description: "Start a new project from scratch or from a template.",
    },
    {
      title: "Project Templates",
      href: "/",
      description: "Browse and use predefined project templates.",
    },
    {
      title: "Archived",
      href: "/",
      description: "Access your previously archived projects.",
    },
  ],
  resources: [
    {
      title: "Documentation",
      href: "/",
      description: "Comprehensive guides and API references for our platform.",
      icon: FileText,
    },
    {
      title: "Community",
      href: "/",
      description: "Connect with other users and share your experiences.",
      icon: Users,
    },
    {
      title: "Help Center",
      href: "/",
      description: "Get answers to common questions and issues.",
      icon: HelpCircle,
    },
  ],
};

const route = useRoute();
const activeItem = ref(route.path);
const isMobileMenuOpen = ref(false);

// Track open/closed state for dropdown menus
const openDropdowns = ref({
  projects: false,
  resources: false,
  settings: false
});

// Toggle dropdown state
const toggleDropdown = (section) => {
  openDropdowns.value[section] = !openDropdowns.value[section];
};

// MenuItem logout
const logout = () => {
  // ทำการลบ token หรือ session
  // แล้วค่อย redirect ไปหน้า login
  localStorage.removeItem('token');
  router.push('/login');
};

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
  <!-- lg:hidden ซ้อนตอนขนาด desktop -->
  <!-- lg:flex แสดงตอนขนาด desktop -->
  <!-- sm, md, lg, xl, 2xl -->
  <nav class="border-b bg-background sticky top-0 z-20 w-full">
    <div class="flex h-14 items-center px-4 md:px-6">
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
        <router-link to="/" class="flex items-center">
          <img
            src="https://www.radix-vue.com/logo.svg"
            alt="YourApp Logo"
            class="h-8 w-auto"
          />
          <span class="font-bold text-xl ml-1">YourApp</span>
        </router-link>
      </div>

      <!-- Desktop Navigation (hidden on mobile) -->
      <NavigationMenu class="hidden lg:flex">
        <NavigationMenuList>
          <!-- Simple menu items without dropdowns -->
          <NavigationMenuItem v-for="item in navItems.simple" :key="item.title">
            <router-link
              :to="item.href"
              custom
              v-slot="{ navigate, isActive }"
              :class="item.href === activeItem ? 'bg-accent text-accent-foreground' : ''"
            >
              <a
                @click="navigate"
                :class="[
                  navigationMenuTriggerStyle(),
                  isActive ? 'text-primary' : '',
                  'cursor-pointer',
                ]"
                class="flex items-center"
              >
                <component :is="item.icon" class="mr-2 h-4 w-4" />
                <span>{{ item.title }}</span>
              </a>
            </router-link>
          </NavigationMenuItem>

          <!-- Projects dropdown -->
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Folder class="mr-2 h-4 w-4" />
              Projects
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                <li v-for="item in navItems.projects" :key="item.title">
                  <router-link :to="item.href" custom v-slot="{ navigate }">
                    <a
                      @click="navigate"
                      class="block select-none space-y-1 rounded-md cursor-pointer p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div class="text-sm font-medium leading-none">{{ item.title }}</div>
                      <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {{ item.description }}
                      </p>
                    </a>
                  </router-link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <!-- Resources dropdown -->
          <NavigationMenuItem>
            <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul class="grid gap-3 p-6 w-[400px] md:w-[500px]">
                <li class="row-span-3">
                  <router-link to="/" custom v-slot="{ navigate }">
                    <a
                      @click="navigate"
                      class="flex h-full w-full select-none flex-col justify-end rounded-md cursor-pointer bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    >
                      <div class="mb-2 mt-2 text-lg font-medium">Resources Hub</div>
                      <p class="text-sm leading-tight text-muted-foreground">
                        Access all the resources and documentation you need to succeed
                        with our platform.
                      </p>
                    </a>
                  </router-link>
                </li>
                <li v-for="item in navItems.resources" :key="item.title">
                  <router-link :to="item.href" custom v-slot="{ navigate }">
                    <a
                      @click="navigate"
                      class="block select-none space-y-1 rounded-md cursor-pointer p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div class="flex items-center text-sm font-medium leading-none">
                        <component :is="item.icon" class="mr-2 h-4 w-4" />
                        {{ item.title }}
                      </div>
                      <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {{ item.description }}
                      </p>
                    </a>
                  </router-link>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div class="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" class="rounded-full">
          <Bell class="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="icon" class="rounded-full">
              <User class="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-56 mt-5">
            <DropdownMenuLabel>บัญชีของฉัน</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings class="mr-2 h-4 w-4" />
              <span>ตั้งค่า</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <User class="mr-2 h-4 w-4" />
              <span>โปรไฟล์</span>
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
              <!-- Simple items -->
              <router-link
                v-for="item in navItems.simple"
                :key="item.title"
                :to="item.href"
                class="flex items-center px-3 py-2 my-1 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground"
                :class="
                  item.href === activeItem ? 'bg-accent text-accent-foreground' : ''
                "
              >
                <component :is="item.icon" class="mr-3 h-5 w-5" />
                {{ item.title }}
              </router-link>

              <!-- Projects dropdown -->
              <div class="px-0 py-2">
                <button
                  @click="toggleDropdown('projects')"
                  class="w-full flex items-center justify-between text-base font-medium px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground"
                >
                  <div class="flex items-center">
                    <Folder class="mr-3 h-5 w-5" />
                    Projects
                  </div>
                  <component
                    :is="openDropdowns.projects ? ChevronDown : ChevronRight"
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
                    v-if="openDropdowns.projects"
                    class="mt-2 pl-8 space-y-1 origin-top"
                  >
                    <router-link
                      v-for="item in navItems.projects"
                      :key="item.title"
                      :to="item.href"
                      class="block px-3 py-2 rounded-md text-sm hover:bg-accent hover:text-accent-foreground"
                    >
                      {{ item.title }}
                    </router-link>
                  </div>
                </Transition>
              </div>

              <!-- Resources dropdown -->
              <div class="px-0 py-2">
                <button
                  @click="toggleDropdown('resources')"
                  class="w-full flex items-center justify-between text-base font-medium px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground"
                >
                  <div class="flex items-center">
                    <FileText class="mr-3 h-5 w-5" />
                    Resources
                  </div>
                  <component
                    :is="openDropdowns.resources ? ChevronDown : ChevronRight"
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
                    v-if="openDropdowns.resources"
                    class="mt-2 pl-8 space-y-1 origin-top"
                  >
                    <router-link
                      v-for="item in navItems.resources"
                      :key="item.title"
                      :to="item.href"
                      class="block px-3 py-2 rounded-md text-sm hover:bg-accent hover:text-accent-foreground"
                    >
                      {{ item.title }}
                    </router-link>
                  </div>
                </Transition>
              </div>

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
/* Make the mobile menu overlay scroll properly */
/* @media (max-width: 768px) {
  body.overflow-hidden {
    overflow: hidden;
  }
} */

/* Custom scrollbar styles */
/* :deep(.scrollbar) {
  width: 8px;
  background-color: transparent;
} */

/* :deep(.thumb) {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
} */

/* :deep(.thumb:hover) {
  background-color: rgba(0, 0, 0, 0.3);
} */

/* :deep(.viewport) {
  width: 100%;
  height: 100%;
} */
</style>
