import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import store from './store'
import vuetify from './plugins/vuetify';
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'

Vue.use(VueSweetalert2);
Vue.config.productionTip = false
Vue.use(VueMoment, {
    moment,
})

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')