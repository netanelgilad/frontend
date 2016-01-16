import Vue from 'vue'
import $ from 'jquery'

export default class Scenario {
  constructor ({ name, actions = [], stateDefinition = [] }) {
    this.name = name
    this.actions = actions
    this.stateDefinition = stateDefinition

    this.initialStep = {
      name: 'initial',
      state: this.createState()
    }
  }

  createState () {
    let newState = {}
    this.stateDefinition.forEach((prop) => {
      newState[prop] = null
    })
    return newState
  }

  addStep (name, action) {
    let currentNode = this.initialStep
    while (currentNode.link) {
      currentNode = currentNode.link.node
    }

    Vue.set(currentNode, 'link', {
      action: action,
      node: {
        name,
        state: $.extend(true, {}, currentNode.state)
      }
    })
  }

  get steps () {
    let result = []
    let currentNode = this.initialStep
    while (currentNode) {
      result.unshift(currentNode)
      currentNode = currentNode.link ? currentNode.link.node : undefined
    }
    return result
  }
}
