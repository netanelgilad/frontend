import Vue from 'vue';
import * as $ from 'jquery';
import { isUndefined, forEach } from 'underscore';

export const INITIAL_STEP_NAME: string = 'inital';

export default class Scenario {
  public actions: Array<any>;
  
  private name: string;
  private stateDefinition: any;
  private initialStep: any;
  
  constructor ({ name, actions = [], stateDefinition = [], initialStep = undefined }: Object) {
    this.name = name;
    this.actions = actions;
    this.stateDefinition = stateDefinition;

    if (initialStep) {
      this.initialStep = this.updateNullsInSteps(initialStep);
    } else {
      this.initialStep = {
        name: INITIAL_STEP_NAME,
        state: this.createState()
      };
    }
  }

  public addStep (name: string, action: string): void {
    let currentNode: any = this.initialStep;
    while (currentNode.link) {
      currentNode = currentNode.link.node;
    }

    Vue.set(currentNode, 'link', {
      action: action,
      node: {
        name,
        state: $.extend(true, {}, currentNode.state)
      }
    });
  }

  public getStateByStep (stepName: string): any {
    let currentNode: any = this.initialStep;

    while (!isUndefined(currentNode) && currentNode.name !== stepName) {
      currentNode = isUndefined(currentNode.link) ? undefined : currentNode.link.node;
    }

    return isUndefined(currentNode) ? undefined : currentNode.state;
  }

  private updateNullsInSteps (initialStep: any): any {
    let currentNode: any = initialStep;
    while (!isUndefined(currentNode)) {
      forEach(this.stateDefinition, (prop: string) => {
        if (isUndefined(currentNode.state[prop])) {
          currentNode.state[prop] = undefined;
        }
      });
      currentNode = isUndefined(currentNode.link) ? undefined : currentNode.link.node;
    }
    return initialStep;
  }

  private createState (): any {
    let newState: Object = {};
    this.stateDefinition.forEach((prop: string) => {
      newState[prop] = undefined;
    });
    return newState;
  }

  get steps (): Array<any> {
    let result: Array<any> = [];
    let currentNode: any = this.initialStep;
    while (currentNode) {
      result.unshift(currentNode);
      currentNode = currentNode.link ? currentNode.link.node : undefined;
    }
    return result;
  }
}
