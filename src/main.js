import Vue from 'vue'
import Action from './action'
import AppEditor from './ui/app-editor.vue'
import { findWhere } from 'underscore'
import './ui/directives/clear-on-input.vue'

let stores = {
  components: [],
  currentComponent: {}
}

Action('createNewComponent', (name) => {
  let comp = {
    name,
    template: ''
  }
  stores.components.push(comp)
  stores.currentComponent = comp
})

Action('setComponentTemplate', (name, template) => {
  let comp = findWhere(stores.components, {name})
  comp.template = template
})

Action('setCurrentComponent', (name) => {
  let comp = findWhere(stores.components, {name})
  stores.currentComponent = comp
})
Vue.config.debug = true
Vue.mixin({
  methods: {
    action (name, ...args) {
      Action(name)(...args)
    }
  },
  replace: false
})

/* eslint-disable no-new */
new Vue({
  el: 'body',
  data: () => stores,
  components: {AppEditor}
})
