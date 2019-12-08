import Vue from 'vue'
import VueRouter from 'vue-router'
import Admin from '../views/Admin.vue'
import Login from '../views/Login.vue'
import store from "../store"
import AccountSettings from '../components/AccountSetting.vue';
import Add from '../views/AddBorrower.vue';
Vue.use(VueRouter)


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login,
            beforeEnter: (to, from, next) => {
                if (store.state.authenticated == true) {
                    next("/admin");
                } else {
                    next();
                }
    
            },
        },
        {
            path: "/",
            redirect: {
                path: "/admin"
            },
        },
        {
            path: '/admin',
            name: 'Dashboard',
            component: Admin,
            beforeEnter: (to, from, next) => {
                if (store.state.authenticated == false) {
                    next("/login");
                } else {
                    next();
                }
            }
        },
        
        {
            path: '/borrower',
            name: 'Add',
            component: Add,
            beforeEnter: (to, from, next) => {
                if (store.state.authenticated == false) {
                    next("/login");
                } else {
                    next();
                }
            }
        },
        {
            path: '/account-settings',
            name: 'Settings',
            component: AccountSettings,
            beforeEnter: (to, from, next) => {
                if (store.state.authenticated == false) {
                    next("/login");
                } else {
                    next();
                }
            }
        },
        {
            path: "*",
            redirect: {
                path: "/"
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(route => route.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next();
        } else {
            next({ path: "/" });
        }
    }
    next();
});

export default router