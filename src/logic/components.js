import Action from '../action'
import stores from './stores'
import { findWhere } from 'underscore'

Action('createNewComponent', (name) => {
  let comp = {
    name,
    template: '',
    dependencies: []
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

Action('addDependencyToCurrentComponent', (name) => {
  stores.currentComponent.dependencies.push(name)
})
