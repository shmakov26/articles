import { createRouter, createMemoryHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "Home",
        redirect: "/articles",
    },
    {
        path: "/articles",
        name: "ArticlesList",
        component: () => import("../views/ArticlesList.vue"),
    },
    {
        path: "/article/new",
        name: "ArticleCreate",
        component: () => import("../views/ArticleForm.vue"),
    },
    {
        path: "/article/:id/edit",
        name: "ArticleEdit",
        component: () => import("../views/ArticleForm.vue"),
    },
    {
        path: "/article/:id",
        name: "ArticleView",
        component: () => import("../views/ArticleView.vue"),
    },
    {
        path: "/analytics",
        name: "Analytics",
        component: () => import("../views/Analytics.vue"),
    }
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

export default router
