import Vue from 'vue'
import Router from 'vue-router'

require('./css/base.css');
require('./css/index.css');
require('./css/animate.css');
require('./common/flexible.js')();

// install router
Vue.use(Router);
Vue.use(require('vue-resource'));
Vue.http.options.emulateJSON = true;
window.http = Vue.http

require('./filters.js')(Vue)
require('./components.js')(Vue)
require('./directives')(Vue)

var router = new Router();

router.map({
    'special': {
        name: 'special',
        component: require('./components/special.vue')
    },
    '/index/:id/:pageNo': {
        name: 'index',
        component: require('./components/index.vue')
    },
    '/b2c-pro-list/:id/:pageNo': {
        name: 'b2c-pro-list',
        component: require('./components/b2c-shop-list.vue')
    },
    '/take-pro-list/:id/:pageNo': {
        name: 'take-pro-list',
        component: require('./components/take-shop-list.vue')
    },
});

router.beforeEach(function ({ to, next }) {
    next()
});

router.redirect({
    '/shop-list/:id': '/shoplist/:id/1',
    '/index/:id': '/index/:id/1',
    '*': '/special',
});

router.start(require('./components/app.vue'), '#app')