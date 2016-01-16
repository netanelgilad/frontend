<template>
  <template v-if="!isInitialDataLoaded">
    Loading...
  </template>
  <template v-else>
    <template v-if="getComponentsCount() > 0">
      <components-editor
          :components="components"
          :current-component="currentComponent"></components-editor>
    </template>
    <template v-else>
      <div class="centered-container">
        <component-creator-dialog></component-creator-dialog>
      </div>
    </template>
  </template>
</template>

<script>
  import ComponentsEditor from './components-editor.vue'
  import ComponentCreatorDialog from './component-creator-dialog.vue'
  import $ from 'expose-loader?$!expose-loader?jQuery!jquery'
  import 'bootstrap/dist/js/bootstrap.min'
  import 'bootstrap-material-design/dist/js/material.min.js'
  import 'bootstrap-material-design/dist/js/ripples.min.js'
  import { keys } from 'underscore'

  export default {
    props: ['components', 'currentComponent', 'isInitialDataLoaded'],
    components: {
      ComponentsEditor,
      ComponentCreatorDialog
    },
    ready () {
      $.material.init()
    },
    methods: {
      getComponentsCount () {
        return keys(this.$data.components).length
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
