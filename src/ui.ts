import * as Vue from 'vue';
import * as Vuex from 'vuex';
import {Action} from './action';
import * as App from './ui/app.vue';
import stores from './logic/stores';

export function startUI(): void {
  Vue.config.debug = true;
  Vue.use(<Function>Vuex);

  Vue.mixin({
    methods: {
      action (name: string, ...args: Array<any>): void {
        Action(name)(...args);
      }
    },
    replace: false
  });

  new Vue({
    el: 'body',
    data: (): any => stores,
    store: new Vuex.Store({
      state: {
        myObj: 1
      }
    }),
    components: {App}
  });
}
