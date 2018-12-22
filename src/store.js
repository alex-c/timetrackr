import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

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
        setTrackingState: function(state, trackingState) {
            state.state = trackingState;
        },
        addEntryToHistory: function(state, entry) {
            state.history.unshift(entry);
        },
        clearHistory: function(state) {
            state.history = [];
        }
    },
    plugins: [createPersistedState()]
});
