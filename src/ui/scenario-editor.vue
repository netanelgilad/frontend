<template>
  <div class="form-inline">
    <input class="form-control" type="text" id="new-scenario-name" placeholder="Scenario name" v-model="scenario.name"/>
  </div>
  <h4>Add a new step</h4>
  <div>
    <h5>Choose an action:</h5>
    <template v-for="action in scenario.actions">
      <label class="checkbox">
        <input type="radio" :value="action" v-model="selectedAction">
        {{ action }}
      </label>
    </template>
    <h5>Step name:</h5>
    <input class="form-control" type="text" v-model="newStepName" placeholder="Step name" />
    <button class="btn btn-default"
            @click="action('addStepToScenario', scenario, newStepName, selectedAction)"
            :disabled="!isFormValid()">
      Add a new step
    </button>
  </div>
  <template v-for="step in scenario.steps">
    <hr class="seperator" />
    <h5>{{step.name}}</h5>
    <json-editor :json.sync="step.state"></json-editor>
  </template>
</template>

<script>
  import JsonEditor from './json-editor.vue'
  import { isUndefined } from 'underscore'

  export default {
    props: {
      scenario: {
        type: Object,
        required: false
      }
    },
    data () {
      return {
        selectedAction: undefined,
        newStepName: ''
      }
    },
    methods: {
      isFormValid () {
        return !isUndefined(this.$data.selectedAction) && this.$data.newStepName !== ''
      }
    },
    components: {
      JsonEditor
    }
  }
</script>

<style lang="less">
  scenario-editor {
    .seperator {
      margin: 25px auto;
      width: 50%;
      height: 1px;
      border: 0;
      background: black;
      background: -webkit-gradient(linear, 0 0, 100% 0, from(white), to(white), color-stop(50%, black));
    }
  }
</style>
