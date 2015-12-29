import stores from './stores'
import { findWhere } from 'underscore'

export default class Component {
  constructor (name) {
    this.name = name
    this.template = ''
    this.dependencies = []
  }

  setTemplate (newValue) {
    this.template = newValue
  }

  addDependency (dep) {
    this.dependencies.push(dep)
  }

  getComponentDefinition () {
    let comps = {}
    this.dependencies.forEach((dep) => {
      comps[dep] = findWhere(stores.components, { name: dep }).getComponentDefinition()
    })

    return {
      template: this.template,
      components: comps
    }
  }
}
