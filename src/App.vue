<template>
    <div id="app">
        <div id="header">
            <div class="content-width">
                <span id="header-title">timetrackr</span>
            </div>
        </div>
        <div id="timetracker">
            <div class="content-width">
                <b-icon pack="far" icon="clock"></b-icon>
                <span>{{display}}</span>
                <button class="button" style="float:right;" @click="toggleActivity">Start activity</button>
            </div>
        </div>
        <div id="history">
            <div class="content-width">
                <h4>History</h4>
                <p v-for="activity in history">{{activity.start.format(format)}} - {{activity.end.format(format)}}: {{formatDuration(calculateDuration(activity.start, activity.end))}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import dateFns from 'date-fns';
import localForage from 'localForage';

export default {
    name: 'app',
    data: function() {
        return {
            active: false,
            activity: {
                name: "Activity"
            },
            history: [],
            format: "D.MM.YYYY HH:mm",
            display: dateFns.format(new Date(), "HH:mm:ss"),
            refreshFunction: null
        }
    },
    methods: {
        toggleActivity: function() {
            clearInterval(this.refreshFunction);
            this.active ? this.stopActivity() : this.startActivity();
            this.active = !this.active;
        },
        startActivity: function() {
            var startTime = moment();
            this.activity.start = startTime;
            var refreshFunction = this.refreshElapsedTime;
            this.refreshFunction = setInterval(function() {
                refreshFunction(startTime);
            }, 500);
        },
        stopActivity: function() {
            this.activity.end = moment();
            this.refreshCurrentTime();
            var refreshFunction = this.refreshCurrentTime;
            this.refreshFunction = setInterval(function() {
                refreshFunction();
            }, 500);
            this.saveActivity();
        },
        saveActivity: function() {
            this.history.push({start: this.activity.start, end: this.activity.end});
            var history = [];
            for (var i = 0; i < this.history.length; i++) {
                history.push({start: this.history[i].start, end: this.history[i].start});
            }
            localForage.setItem("timetrackr", {history});
        },
        refreshCurrentTime: function() {
            this.display = moment().format("HH:mm:ss");
        },
        refreshElapsedTime: function(startTime) {
            var duration = this.calculateDuration(startTime);
            this.display =  this.formatDuration(duration);
        },
        calculateDuration: function(startTime, endTime) {
            var endTime = endTime || moment();
            return moment.duration(endTime.diff(startTime))
        },
        formatDuration: function(duration) {
            var hours = this.padTime(duration.hours());
            var minutes = this.padTime(duration.minutes());
            var seconds = this.padTime(duration.seconds());
            return `${hours}:${minutes}:${seconds}`;
        },
        padTime: function(number) {
            if (number <= 9) {
                return "0" + number;
            } else {
                return number;
            }
        }
    },
    created: function() {
        var refreshFunction = this.refreshCurrentTime;
        this.refreshFunction = setInterval(function() {
            refreshFunction();
        }, 500);
        localForage.getItem("timetrackr").then(function(state) {
            this.history = state.history;
        }).catch(function(error) {
            localForage.setItem("timetrackr", JSON.stringify({history: []}));
        });
    }
}
</script>

<style lang="scss">
@import "./style/colorscheme.scss";

body {
    margin: 0px;
    font-family: 'Bree Serif', serif;
    background-color: $color-off-main;
    color: $color-dark;
}

.content-width {
    width: 600px;
    margin: auto;
    text-align: left;
    overflow: auto;
}

#header {
    background-color: $color-dark;
    color: $color-off-main;
    text-align: center;
}

#header-title {
    font-size: 42px;
}

#timetracker {
    background-color: $color-main;
    color: $color-off-main;
    text-align: center;
    padding-top: 40px;
    padding-bottom: 40px;
}

#history {
    text-align: center;
    padding-top: 20px;
}
</style>
