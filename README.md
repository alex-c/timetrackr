# timetrackr

> A simple static time tracking app, that persists data to Web Storage.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Roadmap

- [x] Replace localStorage with localForage
- [ ] Replace momentjs with date-fns
- [ ] Move data persistence and loading to own module
- [ ] Move data to Vuex store
- [ ] Decompose app in several components
- [ ] Make tracking of different activities possible
- [ ] Wite a servier for multi-user time tracking
