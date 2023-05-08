import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/test",
        name: "Test",
        component: () =>
            import ("../views/TestingTool.vue")
    },
    {
        path: "/ajustes",
        name: "Ajustes",
        component: () =>
            import ("../views/Settings.vue")
    },
    {
        path: "/clasesglobales",
        name: "Clases Globales",
        component: () =>
            import ("../views/ClassAdmin.vue")
    },
    {
        path: "/misclases",
        name: "Mis clases",
        component: () =>
            import ("../views/public/MyClass.vue")
    }, {
        path: "/usuariosglobales",
        name: "Usuarios Globales",
        component: () =>
            import ("../views/admin/UsersGlobals.vue")
    }, {
        path: "/clase/:id",
        name: "Detalles Clase",
        component: () =>
            import ("../views/clase/DetalleClases.vue")
    }
];

const router = new VueRouter({
    routes
});

export default router;