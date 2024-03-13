import Home from "../views/Home.vue"
import layout from "../views/layout.vue"
import login from "../views/login.vue"
import register from "../views/register.vue"
import company from "../views/company.vue"
import salary from "../views/salary.vue"
import profile from "../views/profile.vue"
const routes = [
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path:"/login",
        name:"login",
        component:login
    },
    {
        path:"/register",
        name:"register",
        component:register

    },
    {
        path:"/",
        name:"layout",
        component:layout,
        redirect:"/company",
        children:[
            {
                path:"/company",
                name:"company",
                component:company
            },
            {
                path:"/salary",
                name:"salary",
                component:salary
            },
            {
                path:"/profile",
                name:"profile",
                component:profile
            }
        ]
    }
]
export default routes
