<template>
    <div id="app">
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <div class="navbar-item" >
                    <span id="navbar-title-icon" class="icon is-large"><i class="far fa-clock fa-2x"></i></span>
                    <span id="navbar-title">timetrackr</span>
                </div>
                <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div id="navbar" class="navbar-menu">
                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                            <a class="button is-link" href="" disabled>
                                <span class="icon"><i class="fab fa-github-alt"></i></span><span>Github</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <div id="content-container">
            <div id="header">
                timetrackr
                <span id="datetime">{{time}} / {{date}}</span>
            </div>
            <div id="timetrackr">
                <span class="icon is-large"><i class="far fa-clock fa-2x"></i></span>
                <span id="tracking-display">{{display}}</span>
                <button class="button" @click="toggleTracking">{{state == 0 ? "Start tracking" : "Stop tracking"}}</button>
            </div>
            <History></History>
        </div>
    </div>
</template>

<script>
import formatDurationMixin from './mixins/formatDuration.js';
import History from './components/History.vue';

export default {
    name: 'App',
    components: {History},
    mixins: [formatDurationMixin],
    data: function() {
        return {
            date: '',
            time: '',
            display: ''
        }
    },
    computed: {
        state: function() {
            return this.$store.state.state;
        }
    },
    mounted: function() {
        this.updateDateAndTime(new Date());
        this.startTimeUpdateLoop();
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
        startTimeUpdateLoop: function() {
            var self = this;
            setInterval(function() {
                self.updateTime();
                if (self.state == 1) {
                    let trackedDurationInSeconds = parseInt((Date.now() - self.$store.state.tracking.start) / 1000);
                    self.display = self.formatDuration(trackedDurationInSeconds)
                }
            }, 1000);
        },
        toggleTracking: function() {
            if (this.state == 0) {
                this.$store.state.tracking.start = Date.now();
                this.$store.commit('setTrackingState', 1);
            } else if (this.state == 1) {
                this.$store.state.tracking.stop = Date.now();
                this.$store.commit('setTrackingState', 0);
                this.pushToHistory(this.$store.state.tracking);
                this.display = '';
            }
        },
        pushToHistory: function(tracking) {
            var historyEntry = {
                date: new Date().toLocaleDateString(),
                start: new Date(tracking.start).toLocaleTimeString(),
                stop: new Date(tracking.stop).toLocaleTimeString(),
                duration: this.formatDuration(parseInt((tracking.stop - tracking.start) / 1000))
            }
            this.$store.commit('addEntryToHistory', historyEntry);
        }
    }
}
</script>

<style lang="scss">
@import "./assets/colorscheme.scss";
@import "bulma/sass/utilities/_all.sass";
@import "bulma/sass/elements/button.sass";
@import "bulma/sass/components/navbar.sass";

body {
    margin: 0px;
    font-family: 'Bree Serif', serif;
    text-align: center;
    background-color: $color-off-shade-light;
    color: $color-dark;
}

.navbar {
    box-shadow: 0px 1px 5px 3px #ACACAC;
}

#navbar-title {
    color: $color-dark;
    font-size: 36px;
    text-shadow: 1px 1px 1px black;
    position: relative;
    top: -4px;
}

#navbar-title-icon {
    color: $color-dark;
    text-shadow: 1px 1px 1px black;
    margin-right: 6px;
}

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

#timetrackr {
    background: $color-dark;
    border-radius: 3px;
    padding: 20px;
    overflow: auto;
    color: white;
    box-shadow: 1px 1px 2px 0px black;
}

#tracking-display {
    margin-left: 14px;
    position: relative;
    top: -6px;
}

#timetrackr button {
    float: right;
}
</style>
