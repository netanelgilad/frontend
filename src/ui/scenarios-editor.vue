<template>
  <button class="btn btn-raised btn-primary"
          @click="createNewScenario()">
    Create a new scenario
  </button>
  <h3>Scenarios</h3>
  <ul class="scenario-list">
    <li v-for="scenario in component.scenarios"
        class="scenario-item"
        :class="{ 'running': isRunningScenario(scenario.name) }">
      <span>{{ scenario.name }}</span>
      <i class="material-icons"
         v-if="scenario.name !== component.currentRunningScenario"
         @click="action('setCurrentRunningScenarioOfComponent', scenario.name)">
        play_arrow
      </i>
      <i class="material-icons" v-else>replay</i>
      <i class="material-icons"
         @click="editScenario(scenario.name)">mode_edit</i>
    </li>
  </ul>
  <div class="modal fade" id="scenario-editor-modal" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content" v-if="hasCurrentEditedScenario()">
        <div class="modal-body">
          <scenario-editor :scenario="component.currentEditedScenario"></scenario-editor>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary"
                  :disabled="component.currentEditedScenario.name === ''"
                  @click="action('saveCurrentEditedScenarioOfComponent', component)">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as ScenarioEditor from './scenario-editor.vue'
  import * as $ from 'jquery'
  import Action from '../action'
  import { isUndefined } from 'underscore'

  export default {
    props: ['component', 'propertiesData', 'currentRunningScenario'],
    methods: {
      createNewScenario () {
        Action('createNewScenarioOnComponent')(this.component)
        $('#scenario-editor-modal').modal('show')
      },
      editScenario (scenarioName) {
        Action('setCurrentEditedScenarioOfComponent')(this.component, scenarioName)
        $('#scenario-editor-modal').modal('show')
      },
      hasCurrentEditedScenario () {
        return !isUndefined(this.component.currentEditedScenario)
      },
      isRunningScenario (name) {
        return this.currentRunningScenario &&
            this.currentRunningScenario.name === name
      }
    },
    components: {
      ScenarioEditor
    }
  }
</script>

<style lang="less">
  scenarios-editor {
    display: flex;
    flex-flow: column;

    .scenario-list {
      .scenario-item {
        i.material-icons {
          cursor: pointer;
        }
      }

      .scenario-item.running {
        >span {
          color: blueviolet;
          cursor: pointer;
        }
      }
    }
  }
</style>
