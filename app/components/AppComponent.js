import Vue from 'vue';
import template from './AppComponent.html';
import GridComponent from './grid/GridComponent';

const AppComponent = Vue.extend({
  template,
  components: {
    'grid-component': GridComponent
  }
});

export default AppComponent;
