import Action from '../action';
import Scenario, { INITIAL_STEP_NAME } from './scenario';
import { findWhere } from 'underscore';
import stores from './stores';
import Component from './component';

Action('createNewScenarioOnComponent', (component: Component) => {
  component.setCurrentEditedScenario(
    new Scenario({
      name: '',
      actions: component.actions,
      stateDefinition: component.properties
    }));
});

Action('addStepToScenario', (scenario: Scenario, name: string, action: string) => {
  scenario.addStep(name, action);
});

Action('setCurrentEditedScenarioOfComponent', (component: Component, scenarioName: string) => {
  component.setCurrentEditedScenario(findWhere(component.scenarios, { name: scenarioName }));
});

Action('saveCurrentEditedScenarioOfComponent', (component: Component) => {
  component.upsertScenario(component.currentEditedScenario);
});

Action('setCurrentRunningScenario', (scenarioName: string) => {
  let scenario: Scenario = stores.currentComponent.getScenarioByName(scenarioName);
  stores.currentRunningScenario = {
    name: scenarioName,
    scenario: scenario,
    currentState: scenario.getStateByStep(INITIAL_STEP_NAME)
  };
});
