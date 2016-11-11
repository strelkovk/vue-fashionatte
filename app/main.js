import Vue from 'vue';
Vue.config.debug = true;
import AppComponent from './components/AppComponent';

new Vue({
    el: '#app',
    components: {
        'app-component': AppComponent,
    },
    data: {}
});
