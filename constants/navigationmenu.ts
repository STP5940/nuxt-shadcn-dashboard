import {
    Album,
    Folder,
    FileText,
    Users,
    HelpCircle,
    Table,
    Component,
    CircleSmall,
} from "lucide-vue-next";

// NavigationMenu items
export const navItems = [
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