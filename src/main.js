import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import store from './store'
import vuetify from './plugins/vuetify';


Vue.use(VueSweetalert2);
Vue.config.productionTip = false


new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')