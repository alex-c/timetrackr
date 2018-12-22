import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        state: 0,
        tracking: {
            start: '',
            stop: ''
        },
        history: []
    },
    mutations: {
        addEntryToHistory: function(state, entry) {
            state.history.unshift(entry);
        },
        clearHistory: function(state) {
            state.history = [];
        }
    }
});
