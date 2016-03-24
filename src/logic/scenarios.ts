import Action from '../action'
import Scenario, { INITIAL_STEP_NAME } from './scenario'
import { findWhere } from 'underscore'
import stores from './stores'

Action('createNewScenarioOnComponent', (component) => {
  component.setCurrentEditedScenario(
    new Scenario({
      name: '',
      actions: component.actions,
      stateDefinition: component.properties
    }))
})

Action('addStepToScenario', (scenario, name, action) => {
  scenario.addStep(name, action)
})

Action('setCurrentEditedScenarioOfComponent', (component, scenarioName) => {
  component.setCurrentEditedScenario(findWhere(component.scenarios, { name: scenarioName }))
})

Action('saveCurrentEditedScenarioOfComponent', (component) => {
  component.upsertScenario(component.currentEditedScenario)
})

Action('setCurrentRunningScenario', (scenarioName) => {
  let scenario = stores.currentComponent.getScenarioByName(scenarioName)
  stores.currentRunningScenario = {
    name: scenarioName,
    scenario: scenario,
    currentState: scenario.getStateByStep(INITIAL_STEP_NAME)
  }
})
