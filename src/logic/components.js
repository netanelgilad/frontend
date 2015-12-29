import Action from '../action'
import stores from './stores'
import Component from './component'
import { findWhere } from 'underscore'

Action('createNewComponent', (name) => {
  let comp = new Component(name)
  stores.components.push(comp)
  stores.currentComponent = comp
})

Action('setComponentTemplate', (name, template) => {
  let comp = findWhere(stores.components, {name})
  comp.setTemplate(template)
})

Action('setCurrentComponent', (name) => {
  let comp = findWhere(stores.components, {name})
  stores.currentComponent = comp
})

Action('addDependencyToCurrentComponent', (name) => {
  stores.currentComponent.addDependency(name)
})
