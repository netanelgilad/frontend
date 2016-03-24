import stores from './stores'
import { findWhere, forEach } from 'underscore'
import Vue from 'vue'
import Scenario from './scenario'

export default class Component {
  public name: string;
  private template;
  private style;
  private dependencies;
  private properties;
  private actions;
  private scenarios;
  private isSaved;
  
  constructor ({
      name,
      template: template = '',
      style = '',
      dependencies: dependencies = [],
      properties: properties = [],
      actions: actions = [],
      scenarios: scenarios = {}
    }) {
    this.name = name
    this.template = template
    this.style = style
    this.dependencies = dependencies
    this.properties = properties
    this.actions = actions

    forEach(scenarios, (scenario, name) => {
      scenarios[name] = new Scenario(scenario)
    })

    this.scenarios = scenarios
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

  addAction (action) {
    this.actions.push(action)
    this.isSaved = false
  }

  upsertScenario (scenario) {
    Vue.set(this.scenarios,
      scenario.name,
      scenario)
    this.isSaved = false
  }

  setCurrentEditedScenario (scenario) {
    Vue.set(this, 'currentEditedScenario', scenario)
  }

  getScenarioByName (name) {
    return findWhere(this.scenarios, { name })
  }

  setCurrentRunningScenario (scenarioName) {
    Vue.set(this, 'currentRunningScenario', scenarioName)
  }

  getComponentDefinition () {
    let components = {}
    this.dependencies.forEach((dep) => {
      components[dep] = findWhere(stores.components, { name: dep }).getComponentDefinition()
    })

    return {
      props: this.properties,
      template: this.template,
      components
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