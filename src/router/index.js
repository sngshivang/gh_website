import routes from "./route";
import {
    createRouter,
    createWebHashHistory,
} from 'vue-router'

export default new createRouter({
    routes: routes,
    history: createWebHashHistory()
})