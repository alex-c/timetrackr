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
    getters: {
        timeTrackedToday: function(state) {
            var timeTrackedToday = 0;
            var todaysHistory = state.history.filter(entry => entry.date == new Date().toLocaleDateString());
            for (let i = 0; i < todaysHistory.length; i++) {
                timeTrackedToday += todaysHistory[i].duration;
            }
            return timeTrackedToday;
        }
    },
    plugins: [createPersistedState()]
});
