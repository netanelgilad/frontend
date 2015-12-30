/* global describe, it, expect */

import Vue from 'vue'
import $ from 'jquery'
import ComponentDependencies from '../../../src/ui/component-dependencies.vue'

class ComponentModel {
  constructor (component, components) {
    this.vm = new Vue({
      replace: false,
      template: '<component-dependencies :component="component" :components="components"></component-dependencies>',
      data: {
        component,
        components
      },
      components: {
        ComponentDependencies
      }
    }).$mount()
    this.el = $(this.vm.$el)
  }

  getDependencies () {
    return this.el.find('ul>li.dependency')
  }

  getAvailableDependencies () {
    return this.el.find('select.available-dependencies>option')
  }
}

describe('component-dependencies.vue', () => {

  // asserting JavaScript options
  it('should have correct message', () => {
    expect(true).toEqual(true)
  })

  // asserting rendered result by actually rendering the component
  it('should render all the component dependencies in the list', () => {
    let component = { name: 'comp', dependencies: ['a-dep', 'b-dep']}
    let components = [{ name: 'comp'}, { name: 'a-dep'}, { name: 'b-dep'}]
    let co = new ComponentModel(component, components)
    expect(co.getDependencies().length).toBe(component.dependencies.length)
  })

  it('should render a select with the available dependencies and an empty option', () => {
    let component = { name: 'comp', dependencies: []}
    let components = [{ name: 'a-dep'}, { name: 'b-dep'}]
    let co = new ComponentModel(component, components)
    expect(co.getAvailableDependencies().length).toBe(components.length + 1)
  })

  it('should not render an option for already defined dependencies', () => {
    let component = { name: 'comp', dependencies: ['a-dep']}
    let components = [{ name: 'comp'}, { name: 'a-dep'}, { name: 'b-dep'}]
    let co = new ComponentModel(component, components)
    expect(co.getAvailableDependencies().filter(`:contains(${component.dependencies[0]})`).length).toBe(0)
  })

  it('should not render an option for the component itself', () => {
    let component = { name: 'comp', dependencies: ['a-dep']}
    let components = [{ name: 'comp'}, { name: 'a-dep'}, { name: 'b-dep'}]
    let co = new ComponentModel(component, components)
    expect(co.getAvailableDependencies().filter(`:contains(${component.name})`).length).toBe(0)
  })
})
