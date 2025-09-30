import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import Projects from '../pages/Projects.vue'
import Minecraft from '../pages/Minecraft.vue'
import ArticlePage from '../pages/ArticlePage.vue'
//import { contentRoutes } from '../content/index.js'

const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/projects', component: Projects },
    { path: '/minecraft', component: Minecraft },

    { path: '/projects/:slug', component: ArticlePage },
    { path: '/minecraft/:slug', component: ArticlePage },
    //...contentRoutes, // /projects/:slug и /minecraft/:slug автоматом
]

export default createRouter({
    history: createWebHistory(),
    routes,
})

/*
const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router*/
