import stores from './stores';
import { findWhere, forEach } from 'underscore';
import Vue from 'vue';
import Scenario from './scenario';

export default class Component {
  public name: string;
  public actions: Array<string>;
  public properties: Array<string>;
  public scenarios: Array<any>;
  public currentEditedScenario: string;
  
  private template: string;
  private style: string;
  private dependencies: Array<string>;
  private isSaved: boolean;
  
  constructor ({
      name,
      template: template = '',
      style = '',
      dependencies: dependencies = [],
      properties: properties = [],
      actions: actions = [],
      scenarios: scenarios = {}
    }: Object) {
    this.name = name;
    this.template = template;
    this.style = style;
    this.dependencies = dependencies;
    this.properties = properties;
    this.actions = actions;

    forEach(scenarios, (scenario: any, scenarioName: string) => {
      scenarios[scenarioName] = new Scenario(scenario);
    });

    this.scenarios = scenarios;
    this.isSaved = true;
  }

  public setTemplate (newValue: string): void {
    this.template = newValue;
    this.isSaved = false;
  }

  public setStyle (newValue: string): void {
    this.style = newValue;
    this.isSaved = false;
  }

  public addDependency (dep: string): void {
    this.dependencies.push(dep);
    this.isSaved = false;
  }

  public addProperty (prop: string): void {
    this.properties.push(prop);
    this.isSaved = false;
  }

  public addAction (action: string): void {
    this.actions.push(action);
    this.isSaved = false;
  }

  public upsertScenario (scenario: any): void {
    Vue.set(this.scenarios,
            scenario.name,
            scenario);
    this.isSaved = false;
  }

  public setCurrentEditedScenario (scenario: any): void {
    Vue.set(this, 'currentEditedScenario', scenario);
  }

  public getScenarioByName (name: string): any {
    return findWhere(this.scenarios, { name });
  }

  public setCurrentRunningScenario (scenarioName: string): void {
    Vue.set(this, 'currentRunningScenario', scenarioName);
  }

  public getComponentDefinition (): Object {
    let components: Object = {};
    this.dependencies.forEach((dep: string) => {
      components[dep] = findWhere(stores.components, { name: dep }).getComponentDefinition();
    });

    return {
      props: this.properties,
      template: this.template,
      components
    };
  }

  public getComputedStyle (): string {
    let computedStyle: string = this.name + ' { ' + this.style + ' ';
    this.dependencies.forEach((dep: string) => {
      let comp: Component = findWhere(stores.components, { name: dep });
      computedStyle += comp.getComputedStyle() + ' ';
    });
    computedStyle += ' }\n';
    return computedStyle;
  }
}
