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
            <div id="history">
                <div id="history-header">
                    <span id="history-title">History</span>
                    <button class="button is-small" @click="clearHistory">
                        <span class="icon is-small"><i class="fas fa-trash"></i></span>
                        <span>Clear</span>
                    </button>
                </div>
                <table class="table is-fullwidth">
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
                            <td>{{entry.duration}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import formatDurationMixin from './mixins/formatDuration.js';

export default {
    name: 'app',
    components: {},
    mixins: [formatDurationMixin],
    data: function() {
        return {
            date: '',
            time: '',
            state: 0,
            display: '',
            tracking: {
                start: '',
                stop: ''
            },
            history: []
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
                    let trackedDurationInSeconds = parseInt((Date.now() - self.tracking.start) / 1000);
                    self.display = self.formatDuration(trackedDurationInSeconds)
                }
            }, 1000);
        },
        toggleTracking: function() {
            if (this.state == 0) {
                this.tracking.start = Date.now();
                this.state = 1;
            } else if (this.state == 1) {
                this.tracking.stop = Date.now();
                this.pushToHistory(this.tracking);
                this.display = '';
                this.state = 0
            }
        },
        pushToHistory: function(tracking) {
            var historyEntry = {
                date: new Date().toLocaleDateString(),
                start: new Date(tracking.start).toLocaleTimeString(),
                stop: new Date(tracking.stop).toLocaleTimeString(),
                duration: this.formatDuration(parseInt((tracking.stop - tracking.start) / 1000))
            }
            this.history.unshift(historyEntry);
        },
        clearHistory: function() {
            this.history = [];
        }
    }
}
</script>

<style lang="scss">
@import "./assets/colorscheme.scss";
@import "bulma/sass/utilities/_all.sass";
@import "bulma/sass/elements/button.sass";
@import "bulma/sass/elements/table.sass";
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

#history {
    margin-top: 40px;
}

#history-header {
    margin-bottom: 4px;
}

#history-header button {
    float: right;
    position: relative;
    bottom: -3px;
}

#history-title {
    font-size: 24px;
    text-shadow: 1px 1px 1px black;
}

.table {
    font-size: 14px;
    color: #5C5C5C;
    box-shadow: 1px 1px 2px 1px grey;
}
</style>
