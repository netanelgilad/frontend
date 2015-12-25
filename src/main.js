import Vue from 'vue'
import Action from './action'
import AppEditor from './ui/app-editor.vue'

let stores = {
  components: [],
  currentComponent: ''
}

Action('createNewComponent', (name) => {
  stores.components.push({
    name,
    template: ''
  })
  stores.currentComponent = name
})

Action('setComponentTemplate', (name, template) => {

})

Vue.mixin({
  methods: {
    action (name, ...args) {
      Action(name)(...args)
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: 'body',
  data: () => stores,
  components: {AppEditor}
})
