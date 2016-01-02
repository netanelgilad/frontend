import stores from './stores'
import { findWhere } from 'underscore'

export default class Component {
  constructor ({ name, template: template = '', dependencies: dependencies = [] }) {
    this.name = name
    this.template = template
    this.dependencies = dependencies
    this.isSaved = true
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
