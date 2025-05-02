<script setup lang="js">
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
  LogOut,
  Component,
  Circle,
  CircleSmall,
  Moon,
  Sun,
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
  localStorage.removeItem('token');
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

// Nav items data
const navItems = [
  {
    items: [
      /* {
        title: "Dashboard",
        icon: LayoutDashboard,
        link: "/"
      }, */
      {
        title: 'Survey Request',
        icon: Album,
        link: '/surveyrequest'
      },
      {
        title: 'Datatable',
        icon: Table,
        link: '/datatable'
      }
    ]
  },
  {
    title: 'Projects',
    icon: Folder,
    children: [
      {
        title: 'All Projects',
        link: '/allprojects',
        description: 'View all your ongoing and completed projects.'
      },
      {
        title: 'Create New',
        link: '/createnew',
        description: 'Start a new project from scratch or from a template.'
      },
      {
        title: 'Project Templates',
        link: '/projecttemplates',
        description: 'Browse and use predefined project templates.'
      },
      {
        title: 'Archived',
        link: '/archived',
        description: 'Access your previously archived projects.'
      }
    ]
  },
  {
    title: 'Resources',
    icon: FileText,
    children: [
      {
        title: 'Documentation',
        icon: FileText,
        link: '/documentation',
        description: 'Comprehensive guides and API references for our platform.'
      },
      {
        title: 'Community',
        icon: Users,
        link: '/community',
        description: 'Connect with other users and share your experiences.'
      },
      {
        title: 'Help Center',
        icon: HelpCircle,
        link: '/helpcenter',
        description: 'Get answers to common questions and issues.'
      }
    ]
  },
  {
    title: 'Components',
    icon: Component,
    children: [
      {
        title: 'Accordion',
        icon: CircleSmall,
        link: '/components/accordion',
      },
      {
        title: 'Alert',
        icon: CircleSmall,
        link: '/components/alert',
      },
      {
        title: 'Alert Dialog',
        icon: CircleSmall,
        link: '/components/alert-dialog',
      },
      {
        title: 'Aspect Ratio',
        icon: CircleSmall,
        link: '/components/aspect-ratio',
      },
      {
        title: 'Avatar',
        icon: CircleSmall,
        link: '/components/avatar',
      },
      {
        title: 'Badge',
        icon: CircleSmall,
        link: '/components/badge',
      },
      {
        title: 'Breadcrumb',
        icon: CircleSmall,
        link: '/components/breadcrumb',
      },
      {
        title: 'Button',
        icon: CircleSmall,
        link: '/components/button',
      },
      {
        title: 'Calendar',
        icon: CircleSmall,
        link: '/components/calendar',
      },
      {
        title: 'Card',
        icon: CircleSmall,
        link: '/components/card',
      },
      {
        title: 'Carousel',
        icon: CircleSmall,
        link: '/components/carousel',
      },
      {
        title: 'Checkbox',
        icon: CircleSmall,
        link: '/components/checkbox',
      },
      {
        title: 'Collapsible',
        icon: CircleSmall,
        link: '/components/collapsible',
      },
      {
        title: 'Combobox',
        icon: CircleSmall,
        link: '/components/combobox',
      },
      {
        title: 'Command',
        icon: CircleSmall,
        link: '/components/command',
      },
      {
        title: 'Context Menu',
        icon: CircleSmall,
        link: '/components/context-menu',
      },
      {
        title: 'Dialog',
        icon: CircleSmall,
        link: '/components/dialog',
      },
      {
        title: 'Drawer',
        icon: CircleSmall,
        link: '/components/drawer',
      },
      {
        title: 'Dropdown Menu',
        icon: CircleSmall,
        link: '/components/dropdown-menu',
      },
      {
        title: 'Form',
        icon: CircleSmall,
        link: '/components/form',
      },
      {
        title: 'Hover Card',
        icon: CircleSmall,
        link: '/components/hover-card',
      },
      {
        title: 'Input',
        icon: CircleSmall,
        link: '/components/input',
      },
      {
        title: 'Label',
        icon: CircleSmall,
        link: '/components/label',
      },
      {
        title: 'Menubar',
        icon: CircleSmall,
        link: '/components/menubar',
      },
      {
        title: 'Navigation Menu',
        icon: CircleSmall,
        link: '/components/navigation-menu',
      },
      {
        title: 'Number Field',
        icon: CircleSmall,
        link: '/components/number-field',
      },
      {
        title: 'Pagination',
        icon: CircleSmall,
        link: '/components/pagination',
      },
      {
        title: 'PIN Input',
        icon: CircleSmall,
        link: '/components/pin-input',
      },
      {
        title: 'Popover',
        icon: CircleSmall,
        link: '/components/popover',
      },
      {
        title: 'Progress',
        icon: CircleSmall,
        link: '/components/progress',
      },
      {
        title: 'Radio Group',
        icon: CircleSmall,
        link: '/components/radio-group',
      },
      {
        title: 'Range Calendar',
        icon: CircleSmall,
        link: '/components/range-calendar',
      },
      {
        title: 'Resizable',
        icon: CircleSmall,
        link: '/components/resizable',
      },
      {
        title: 'Scroll Area',
        icon: CircleSmall,
        link: '/components/scroll-area',
      },
      {
        title: 'Select',
        icon: CircleSmall,
        link: '/components/select',
      },
      {
        title: 'Separator',
        icon: CircleSmall,
        link: '/components/separator',
      },
      {
        title: 'Sheet',
        icon: CircleSmall,
        link: '/components/sheet',
      },
      {
        title: 'Skeleton',
        icon: CircleSmall,
        link: '/components/skeleton',
      },
      {
        title: 'Slider',
        icon: CircleSmall,
        link: '/components/slider',
      },
      {
        title: 'Sonner',
        icon: CircleSmall,
        link: '/components/sonner',
      },
      {
        title: 'Stepper',
        icon: CircleSmall,
        link: '/components/stepper',
        new: true,
      },
      {
        title: 'Switch',
        icon: CircleSmall,
        link: '/components/switch',
      },
      {
        title: 'Table',
        icon: CircleSmall,
        link: '/components/table',
      },
      {
        title: 'Tabs',
        icon: CircleSmall,
        link: '/components/tabs',
      },
      {
        title: 'Tags Input',
        icon: CircleSmall,
        link: '/components/tags-input',
      },
      {
        title: 'Textarea',
        icon: CircleSmall,
        link: '/components/textarea',
      },
      {
        title: 'Toast',
        icon: CircleSmall,
        link: '/components/toast',
      },
      {
        title: 'Toggle',
        icon: CircleSmall,
        link: '/components/toggle',
      },
      {
        title: 'Toggle Group',
        icon: CircleSmall,
        link: '/components/toggle-group',
      },
      {
        title: 'Tooltip',
        icon: CircleSmall,
        link: '/components/tooltip',
      },
    ]
  },
];
</script>

<template>
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
          <img src="/logo.svg" alt="MyApp Logo" class="h-8 w-auto" />
          <span class="font-bold text-xl ml-1">MyApp</span>
        </router-link>
      </div>

      <!-- Desktop Navigation (hidden on mobile) -->
      <NavigationMenu class="hidden lg:flex">
        <NavigationMenuList>
          <!-- Simple menu items -->
          <template v-for="(group, index) in navItems" :key="index">
            <!-- Items with direct links -->
            <template v-if="group.items">
              <NavigationMenuItem v-for="item in group.items" :key="item.title">
                <router-link
                  :to="item.link"
                  class="px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground flex items-center"
                  :class="
                    item.link === activeItem ? 'bg-accent text-accent-foreground' : ''
                  "
                >
                  <component :is="item.icon" class="mr-2 h-4 w-4" />
                  {{ item.title }}
                </router-link>
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
                      <router-link :to="item.link" custom v-slot="{ navigate }">
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
                      </router-link>
                    </li>
                  </ul>

                  <!-- Dropdowns Resources -->
                  <ul
                    class="grid gap-3 p-6 w-[400px] md:w-[500px]"
                    v-else-if="group.title === 'Resources'"
                  >
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
                    <li v-for="item in group.children" :key="item.title">
                      <router-link :to="item.link" custom v-slot="{ navigate }">
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
                      </router-link>
                    </li>
                  </ul>

                  <!-- Dropdowns Components -->
                  <ul
                    class="grid w-[860px] gap-1 p-6 md:grid-cols-4"
                    v-else-if="group.title === 'Components'"
                  >
                    <li v-for="item in group.children" :key="item.title">
                      <router-link
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
                      </router-link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </template>
          </template>
        </NavigationMenuList>
      </NavigationMenu>

      <div class="ml-auto flex items-center gap-2">
        <!-- ปุ่มเปลี่ยนธีม -->
        <Button variant="ghost" size="icon" class="rounded-full" @click="toggleTheme">
          <Moon
            class="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <Sun
            class="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
        </Button>

        <Button variant="ghost" size="icon" class="rounded-full">
          <Bell class="h-5 w-5" />
        </Button>

        <DropdownMenu :modal="false">
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="icon" class="rounded-full">
              <Avatar>
                <AvatarImage src="/unovue.jpg" alt="@unovue" />
                <AvatarFallback>VUE</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="mt-5 w-[99vw] sm:w-56">
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
              <template v-for="(group, index) in navItems" :key="index">
                <!-- Simple items -->
                <template v-if="group.items">
                  <router-link
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
                  </router-link>
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
                        <router-link
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
                        </router-link>
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
