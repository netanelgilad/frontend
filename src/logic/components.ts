import Action from '../action'
import stores from './stores'
import Component from './component'
import * as Firebase from 'firebase'
import * as Vue from 'vue'
import './scenarios'

let db = new Firebase('https://brilliant-fire-9189.firebaseio.com/')
let components = db.child('components')

export function initComponents () {
  return new Promise((resolve) => {
    components.on('value', () => {
      resolve()
    })

    components.on('child_added', (snapshot) => {
      let comp = new Component(snapshot.val())
      Vue.set(stores.components, comp.name, comp)

      if (!stores.currentComponent) {
        stores.currentComponent = comp
      }
    })

    components.on('child_changed', (snapshot) => {
      let comp = snapshot.val()
      stores.components[comp.name] = new Component(comp)
      if (stores.currentComponent.name === comp.name) {
        stores.currentComponent = stores.components[comp.name]
      }
    })
  })
}

// --- Actions ---- //

Action('createNewComponent', (name) => {
  let comp = new Component({name})
  components.child(name).set(comp, () => {
    stores.currentComponent = comp
  })
})

Action('setCurrentComponentTemplate', (template) => {
  stores.currentComponent.setTemplate(template)
})

Action('setCurrentComponentStyle', (style) => {
  stores.currentComponent.setStyle(style)
})

Action('setCurrentComponent', (name) => {
  stores.currentComponent = stores.components[name]
})

Action('addDependencyToCurrentComponent', (name) => {
  stores.currentComponent.addDependency(name)
})

Action('saveCurrentComponent', () => {
  components.child(stores.currentComponent.name).update(stores.currentComponent)
})

Action('addPropertyToCurrentComponent', (prop) => {
  stores.currentComponent.addProperty(prop)
})

Action('addActionToCurrentComponent', (action) => {
  stores.currentComponent.addAction(action)
})

Action('setCurrentRunningScenarioOfComponent', (scenarioName) => {
  stores.currentComponent.setCurrentRunningScenario(scenarioName)
})
