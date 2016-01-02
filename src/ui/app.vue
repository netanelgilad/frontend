<template>
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

<script>
  import ComponentsEditor from './components-editor.vue'
  import ComponentCreatorDialog from './component-creator-dialog.vue'
  import 'expose-loader?$!expose-loader?jQuery!jquery'
  import 'bootstrap/dist/js/bootstrap.min'
  import { keys } from 'underscore'

  export default {
    props: ['components', 'currentComponent'],
    components: {
      ComponentsEditor,
      ComponentCreatorDialog
    },
    methods: {
      getComponentsCount () {
        return keys(this.$data.components).length
      }
    }
  }
</script>

<style>
  @import 'style-loader!css-loader!~bootstrap/dist/css/bootstrap.css';
  @import 'style-loader!css-loader!~bootstrap/dist/css/bootstrap-theme.css';
  .centered-container {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
</style>
