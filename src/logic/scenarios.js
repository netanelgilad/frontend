import Action from '../action'
import Scenario from './scenario'

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

Action('saveCurrentEditedScenarioOfComponent', (component) => {
  component.upsertScenario(component.currentEditedScenario)
})
