import * as Vue from 'vue'
import * as App from './ui/app.vue'
import { initComponents } from './logic/components'
import stores from './logic/stores'
import Action from './action'

Vue.config.debug = true

Vue.mixin({
  methods: {
    action (name, ...args) {
      Action(name)(...args)
    }
  },
  replace: false
})

new Vue({
  el: 'body',
  data: () => stores,
  components: {App}
})

initComponents().then(() => {
  stores.isInitialDataLoaded = true
})
