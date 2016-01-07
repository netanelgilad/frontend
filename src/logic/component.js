import stores from './stores'
import { findWhere } from 'underscore'

export default class Component {
  constructor ({
      name,
      template: template = '',
      style = '',
      dependencies: dependencies = [],
      properties: properties = []
    }) {
    this.name = name
    this.template = template
    this.style = style
    this.dependencies = dependencies
    this.properties = properties
    this.isSaved = true
  }

  setTemplate (newValue) {
    this.template = newValue
    this.isSaved = false
  }

  setStyle (newValue) {
    this.style = newValue
    this.isSaved = false
  }

  addDependency (dep) {
    this.dependencies.push(dep)
    this.isSaved = false
  }

  addProperty (prop) {
    this.properties.push(prop)
    this.isSaved = false
  }

  getComponentDefinition () {
    let comps = {}
    this.dependencies.forEach((dep) => {
      comps[dep] = findWhere(stores.components, { name: dep }).getComponentDefinition()
    })

    return {
      props: this.properties,
      template: this.template,
      components: comps
    }
  }

  getComputedStyle () {
    let computedStyle = this.name + ' { ' + this.style + ' '
    this.dependencies.forEach((dep) => {
      let comp = findWhere(stores.components, { name: dep })
      computedStyle += comp.getComputedStyle() + ' '
    })
    computedStyle += ' }\n'
    return computedStyle
  }
}
