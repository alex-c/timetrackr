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
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Timetrackr from './components/Timetrackr.vue';

export default {
    name: 'App',
    components: {Timetrackr},
    data: function() {
        return {}
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
</style>
