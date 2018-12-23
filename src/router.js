import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

//Import components
import Timetrackr from './components/Timetrackr.vue';

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: Timetrackr
        }
    ]
});
