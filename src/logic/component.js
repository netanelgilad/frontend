import stores from './stores'
import { findWhere } from 'underscore'

export default class Component {
  constructor ({ name, template: template = '', style = '', dependencies: dependencies = [] }) {
    this.name = name
    this.template = template
    this.style = style
    this.dependencies = dependencies
    this.isSaved = true
  }

  setTemplate (newValue) {
    this.template = newValue
  }

  setStyle (newValue) {
    this.style = newValue
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
