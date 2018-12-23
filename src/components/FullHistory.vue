<template>
    <div id="full-history">
        <div id="full-history-header">
            <span id="full-history-title">History</span>
            <button class="button is-small is-danger" @click="clearHistory">
                <span class="icon is-small"><i class="fas fa-trash"></i></span>
                <span>Clear history</span>
            </button>
        </div>
        <table class="table is-fullwidth is-striped">
            <thead>
                <tr>
                    <td>Date</td>
                    <td>Started tracking</td>
                    <td>Stopped tracking</td>
                    <td>Time tracked</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="entry in history">
                    <td>{{entry.date}}</td>
                    <td>{{entry.start}}</td>
                    <td>{{entry.stop}}</td>
                    <td>{{formatDuration(entry.duration)}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import formatDurationMixin from '../mixins/formatDuration.js';

export default {
    name: 'FullHistory',
    mixins: [formatDurationMixin],
    data: function() {
        return {};
    },
    computed: {
        history: function() {
            return this.$store.state.history;
        }
    },
    methods: {
        clearHistory: function() {
            this.$store.commit('clearHistory');
        }
    }
}
</script>

<style lang="scss">
@import "../assets/colorscheme.scss";
@import "bulma/sass/utilities/_all.sass";
@import "bulma/sass/elements/button.sass";
@import "bulma/sass/elements/table.sass";

#full-history-header {
    margin-bottom: 4px;
}

#full-history-header button {
    float: right;
    position: relative;
    top: 35px;
}

#full-history-title {
    font-size: 48px;
    text-shadow: 1px 1px 1px black;
}

.table {
    font-size: 14px;
    color: #5C5C5C;
    box-shadow: 1px 1px 2px 1px grey;
}
</style>
