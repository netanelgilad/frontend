<template>
  <div class="form-inline">
    <input class="form-control" type="text" id="new-scenario-name" placeholder="Scenario name" v-model="scenario.name"/>
    <button class="btn btn-raised btn-primary">Save</button>
  </div>
  <h4>Steps</h4>
  <div class="form-inline">
    <template v-for="action in component.actions">
      <label class="checkbox">
        <input type="radio" :value="action" v-model="selectedAction">
        {{ action }}
      </label>
    </template>
    <input class="form-control" type="text" v-model="newStepName" placeholder="New Step Name" />
    <button class="btn btn-default"
            @click="addNewStep(selectedAction, newStepName)"
            :disabled="!selectedAction">
      Add a new step
    </button>
  </div>
  <template v-for="step in steps">
    <hr class="seperator" />
    <h5>{{step.name}}</h5>
    <json-editor :json.sync="step.state"></json-editor>
  </template>
</template>

<script>
  import JsonEditor from './json-editor.vue'
  import Vue from 'vue'
  import $ from 'jquery'

  export default {
    data () {
      return {
        component: {
          properties: ['tasks'],
          actions: ['addNewTask']
        },
        scenario: {
          name: '',
          stepsTree: {}
        },
        selectedAction: false,
        newStepName: ''
      }
    },
    computed: {
      steps () {
        let result = []
        let currentNode = this.$data.scenario.stepsTree
        while (currentNode) {
          result.unshift(currentNode)
          currentNode = currentNode.link ? currentNode.link.node : undefined
        }
        return result
      }
    },
    ready () {
      this.$set('scenario.stepsTree', { name: 'initial', state: this.createState() })
    },
    methods: {
      addNewStep (selectedAction, name) {
        let currentNode = this.$data.scenario.stepsTree
        while (currentNode.link) {
          currentNode = currentNode.link.node
        }

        Vue.set(currentNode, 'link', {
          action: selectedAction,
          node: {
            name,
            state: $.extend(true, {}, currentNode.state)
          }
        })
      },
      createState () {
        let newState = {}
        this.$data.component.properties.forEach((prop) => {
          newState[prop] = null
        })
        return newState
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
