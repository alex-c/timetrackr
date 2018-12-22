<template>
    <div id="app">
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <div class="navbar-item">
                    <span class="icon is-large"><i class="far fa-clock fa-2x"></i></span>
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
                <span id="date">{{date}}</span>
            </div>
            <div id="timetrackr">
                <span class="icon is-large"><i class="far fa-clock fa-2x"></i></span>
                <span id="time">{{time}}</span>
                <button class="button">Start</button>
            </div>
            <div id="history">
                <div id="history-title">History</div>
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
                        <tr>
                            <td>28.11.2019</td>
                            <td>08:50</td>
                            <td>12:12</td>
                            <td>3:22</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app',
    components: {},
    data: function() {
        return {
            date: '',
            time: ''
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
            }, 1000);
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

#date {
    float: right;
    font-size: 24px;
    position: relative;
    top: 28px;
}

#timetrackr {
    background: $color-dark;
    border-radius: 3px;
    padding: 10px;
    overflow: auto;
    color: white;
    box-shadow: 1px 1px 2px 0px black;
}

#time {
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

#history-title {
    font-size: 24px;
    text-shadow: 1px 1px 1px black;
    margin-bottom: 4px;
}

.table {
    font-size: 14px;
    color: #5C5C5C;
    box-shadow: 1px 1px 2px 1px grey;
}
</style>
