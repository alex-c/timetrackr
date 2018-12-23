# timetrackr
A simple, static time tracking app that persists data to Web Storage.

## NPM commands
```bash
# Install dependencies
npm install

# Serve with hot reload at localhost:8080
npm run serve

# Compiles and minifies for production
npm run build
```

## Development State

**timetrackr** is in development!

TODOs:

- [x] Better display of durations
- [x] Move state to Vuex
    - [x] Persist state to Web Storage
    - [x] Decompose UI in different components
- [x] Only display last n entries in history
    - [x] Offer option to review full history
- [ ] Modify behaviour on change of day: split tracked time into several time spans
- [ ] Process/format history data per day/week/month
    - [ ] Organize full history by month
    - [ ] Display tracked time for today/this week on main page
- [ ] Host on Github pages
    - [ ] Add Github page link in navbar
- [ ] Fix tracking display delay on component load
