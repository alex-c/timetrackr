import Vue from 'vue';
import App from './App.vue';
import Buefy from 'buefy';
import 'buefy/lib/buefy.css';

import VueLocalStore from './vue-localstore.js';

Vue.use(Buefy, {
    defaultIconPack: 'fa'
});

Vue.use(VueLocalStore);

new Vue({
    el: '#app',
    render: h => h(App)
});
