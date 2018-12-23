<template>
    <div id="timetrackr">
        <div id="header">
            timetrackr
            <span id="datetime">{{time}} / {{date}}</span>
        </div>
        <div id="timetrackr-ctrl">
            <span class="icon is-large"><i class="far fa-clock fa-2x"></i></span>
            <span id="tracking-display">{{display}}</span>
            <button class="button" @click="toggleTracking">{{state == 0 ? "Start tracking" : "Stop tracking"}}</button>
        </div>
        <RecentHistory></RecentHistory>
    </div>
</template>

<script>
import calculateDurationMixin from '../mixins/calculateDuration.js';
import formatDurationMixin from '../mixins/formatDuration.js';
import RecentHistory from './RecentHistory.vue';

export default {
    name: 'Timetrackr',
    components: {RecentHistory},
    mixins: [calculateDurationMixin, formatDurationMixin],
    data: function() {
        return {
            date: '',
            time: '',
            display: '-'
        }
    },
    computed: {
        state: function() {
            return this.$store.state.state;
        }
    },
    mounted: function() {
        this.updateDateAndTime(new Date());
        var self = this;
        setInterval(function() {
            self.updateTime();
            if (self.state == 1) {
                self.display = self.formatDuration(self.calculateDuration(self.$store.state.tracking.start))
            }
        }, 1000);
    },
    methods: {
        updateDate: function(date) {
            var date = date || new Date();
            this.date = date.toLocaleDateString();
        },
        updateTime: function(date) {
            var date = date || new Date();
            this.time = date.toLocaleTimeString();
        },
        updateDateAndTime: function(date) {
            this.updateDate(date);
            this.updateTime(date);
        },
        toggleTracking: function() {
            if (this.state == 0) {
                this.$store.state.tracking.start = Date.now();
                this.$store.commit('setTrackingState', 1);
            } else if (this.state == 1) {
                this.$store.state.tracking.stop = Date.now();
                this.$store.commit('setTrackingState', 0);
                this.pushToHistory(this.$store.state.tracking);
                this.display = '-';
            }
        },
        pushToHistory: function(tracking) {
            var historyEntry = {
                date: new Date().toLocaleDateString(),
                start: new Date(tracking.start).toLocaleTimeString(),
                stop: new Date(tracking.stop).toLocaleTimeString(),
                duration: parseInt((tracking.stop - tracking.start) / 1000)
            }
            this.$store.commit('addEntryToHistory', historyEntry);
        }
    }
}
</script>

<style lang="scss">
@import "../assets/colorscheme.scss";
@import "bulma/sass/utilities/_all.sass";
@import "bulma/sass/elements/button.sass";

#content-container {
    width: 600px;
    padding-top: 60px;
    margin: auto;
    text-align: left;
}

#header {
    font-size: 48px;
    text-shadow: 1px 1px 1px black;
}

#datetime {
    float: right;
    font-size: 24px;
    position: relative;
    top: 28px;
}

#timetrackr-ctrl {
    background: $color-dark;
    border-radius: 3px;
    padding: 30px;
    overflow: auto;
    color: white;
    box-shadow: 1px 1px 2px 0px black;
}

#tracking-display {
    margin-left: 14px;
    position: relative;
    top: -6px;
}

#timetrackr-ctrl button {
    float: right;
}
</style>
