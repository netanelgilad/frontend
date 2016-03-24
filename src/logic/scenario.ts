import Vue from 'vue'
import * as $ from 'jquery'
import { isUndefined, forEach } from 'underscore'

export const INITIAL_STEP_NAME = 'inital'

export default class Scenario {
  private name: string;
  private actions: Array<any>;
  private stateDefinition;
  private initialStep;
  
  constructor ({ name, actions = [], stateDefinition = [], initialStep = undefined }) {
    this.name = name
    this.actions = actions
    this.stateDefinition = stateDefinition

    if (initialStep) {
      this.initialStep = this.updateNullsInSteps(initialStep)
    } else {
      this.initialStep = {
        name: INITIAL_STEP_NAME,
        state: this.createState()
      }
    }
  }

  updateNullsInSteps (initialStep) {
    let currentNode = initialStep
    while (!isUndefined(currentNode)) {
      forEach(this.stateDefinition, (prop) => {
        if (isUndefined(currentNode.state[prop])) {
          currentNode.state[prop] = null
        }
      })
      currentNode = isUndefined(currentNode.link) ? undefined : currentNode.link.node
    }
    return initialStep
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

  getStateByStep (stepName) {
    let currentNode = this.initialStep

    while (!isUndefined(currentNode) && currentNode.name !== stepName) {
      currentNode = isUndefined(currentNode.link) ? undefined : currentNode.link.node
    }

    return isUndefined(currentNode) ? undefined : currentNode.state
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
