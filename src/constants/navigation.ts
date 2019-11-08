export const navigation =  {
    items: [
        {
            name: "Dashboard",
            url: "/admin/Dashboard",
            icon: "icon-speedometer"
        },
        {
            name: "Trainers",
            url: "admin/trainers",
            icon: "icon-user",
            children: [
                {
                    name: "Trainers List",
                    url: "/admin/trainers/list",
                    icon: "fa fa-list"
                },
                {
                    name: "Create Trainers",
                    url: "/admin/trainers/create",
                    icon: "fa fa-edit"
                },
            ]
        },
        {
            name: "Users",
            url: "/admin/users",
            icon: "icon-user",
            children: [
                {
                    name: "Users List",
                    url: "/admin/users/list",
                    icon: "fa fa-list"
                },
                {
                    name: "Users Create",
                    url: "/admin/users/create",
                    icon: "fa fa-edit"
                }
            ]
        },
        {
            name: "Franchise Admins",
            url: "admin/franchise-admin",
            icon: "icon-user",
            children: [
                {
                    name: "Franchise Admin List",
                    url: "/admin/franchise-admin/list",
                    icon: "fa fa-list"
                },
                {
                    name: "Create Franchise Admin",
                    url: "/admin/franchise-admin/create",
                    icon: "fa fa-edit",
                    class:'font-navigation'
                },
            ]
        },
        {
            name: "Requests",
            url: "/admin/request",
            icon: "icon-layers",
            children: [
                {
                    name: "All Request List",
                    url: "/admin/requests/list",
                    icon: "fa fa-list"
                },
                // {
                //     name: "Responses Trainers",
                //     url: "/admin/request/response",
                //     icon: "fa fa-clock-o"
                // }
            ]
        },
        {
            name: "Sessions",
            url: "/admin/sessions",
            icon: "icon-calendar",
            children: [
                {
                    name: "Sessions list",
                    url: "/admin/sessions/list/all",
                    icon: "fa fa-list",
                },
                // {
                //     name: "Create Sessions ",
                //     url: "/admin/sessions/create",
                //     icon: "icon-speech"
                // }
            ]
        },

        {
            name: "Packages",
            url: "/admin/packages",
            icon: "icon-bag",
            children: [
                {
                    name: "List all packages",
                    url: "/admin/packages/list",
                    icon: "fa fa-list"
                },
                {
                    name: "Create usual packages",
                    url: "/admin/packages/usual",
                    icon: "fa fa-edit",
                    class:'font-navigation'
                },
                {
                    name: "Create custom packages",
                    url: "/admin/packages/custom",
                    icon: "fa fa-edit",
                    class:'font-navigation'
                },
                {
                    name: "Category packages",
                    url: "/admin/packages/category",
                    icon: "fa fa-cogs",
                    class:'font-navigation'
                }
            ]
        },
        {
            name: "Chat",
            url: "/admin/chat",
            icon: "icon-envelope-open",
            badge: {
            }
        },
        {
            name: "Review Trainers",
            url: "/admin/review-trainers",
            icon: "icon-book-open",
        },
        {
            name: "Earnings Trainers",
            url: "/admin/earning",
            icon: "icon-wallet",
        },
        {
            name: "Coupons",
            url: "/admin/coupons",
            icon: "icon-envelope-open",
            children: [
                {
                    name: "Coupons list",
                    url: "/admin/coupons/list",
                    icon: "fa fa-list"
                },
                {
                    name: "Coupons create",
                    url: "/admin/coupons/create",
                    icon: "fa fa-edit"
                },
                {
                    name: "Coupons generator",
                    url: "/admin/coupons/generator",
                    icon: "icon-speech"
                }
            ]
        },
        {
            name: "Franchise",
            url: "/admin/franchise",
            icon: "icon-map",
            children: [
                {
                    name: "Franchise list",
                    url: "/admin/franchise/list",
                    icon: "fa fa-list"
                },
                {
                    name: "Franchise create",
                    url: "/admin/franchise/create",
                    icon: "fa fa-edit"
                }
            ]
        },
    ]
};
