import Vue from 'vue';
import Pusher from 'pusher-js';
import template from './AppComponent.html';
import GridComponent from './grid/GridComponent';

const AppComponent = Vue.extend({
  template,
  components: {
    'grid-component': GridComponent
  }
});

export default AppComponent;
