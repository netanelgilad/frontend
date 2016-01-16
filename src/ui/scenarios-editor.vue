<template>
  <button class="btn btn-raised btn-primary"
          @click="createNewScenario()">
    Create a new scenario
  </button>
  <h3>Scenarios</h3>
  <ul>
    <li v-for="scenario in component.scenarios">
      {{ scenario.name }}
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
  import ScenarioEditor from './scenario-editor.vue'
  import $ from 'jquery'
  import Action from '../action'
  import { isUndefined } from 'underscore'

  export default {
    props: ['component'],
    methods: {
      createNewScenario () {
        Action('createNewScenarioOnComponent')(this.$data.component)
        $('#scenario-editor-modal').modal('show')
      },
      hasCurrentEditedScenario () {
        return !isUndefined(this.$data.component.currentEditedScenario)
      }
    },
    components: {
      ScenarioEditor
    }
  }
</script>

<style lang="less">
  scenarios-editor {
  }
</style>
