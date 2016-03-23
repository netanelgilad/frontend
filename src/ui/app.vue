<template>
  <template v-if="!isInitialDataLoaded">
    Loading...
  </template>
  <template v-else>
    <template v-if="getLength(components) > 0">
      <components-editor
          :components="components"
          :current-component="currentComponent"
          :current-running-scenario="currentRunningScenario"></components-editor>
    </template>
    <template v-else>
      <div class="centered-container">
        <component-creator-dialog></component-creator-dialog>
      </div>
    </template>
  </template>
</template>

<script>
  import * as ComponentsEditor from './components-editor.vue'
  import * as ComponentCreatorDialog from './component-creator-dialog.vue'
  import 'expose-loader?$!expose-loader?jQuery!jquery'
  import 'bootstrap/dist/js/bootstrap.min'
  import 'bootstrap-material-design/dist/js/material.min.js'
  import 'bootstrap-material-design/dist/js/ripples.min.js'
  import { keys } from 'underscore'
  import * as $ from 'jquery';

  export default {
    props: ['components', 'currentComponent', 'isInitialDataLoaded', 'currentRunningScenario'],
    components: {
      ComponentsEditor,
      ComponentCreatorDialog
    },
    ready () {
      $.material.init()
    },
    methods: {
      getLength (obj) {
        return keys(obj).length
      }
    }
  }
</script>

<style lang="less">
  @import 'style-loader!css-loader!~bootstrap/dist/css/bootstrap.css';
  @import 'style-loader!css-loader!~bootstrap-material-design/dist/css/bootstrap-material-design.css';
  @import 'style-loader!css-loader!~bootstrap-material-design/dist/css/ripples.css';

  body {
    background: white;
  }

  app {
    display: flex;
    height: 100%;

    .centered-container {
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
    }

    components-editor {
      flex: 1;
    }
  }
</style>
