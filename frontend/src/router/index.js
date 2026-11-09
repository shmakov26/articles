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
        path: "/articles/new",
        name: "ArticleCreate",
        component: () => import("../views/ArticleForm.vue"),
    },
    {
        path: "/articles/:id/edit",
        name: "ArticleEdit",
        component: () => import("../views/ArticleForm.vue"),
    },
    {
        path: "/articles/:id",
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
