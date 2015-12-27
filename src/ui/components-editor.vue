<template>
  <div id="container">
    <header class="top-bar">
      <components-list :components="components" :current-component="currentComponent"></components-list>
    </header>
    <content>
      <template-editor :current-component="currentComponent" class="slot"></template-editor>
      <component-preview :current-component="currentComponent" class="slot"></component-preview>
    </content>
  </div>
</template>

<script>
  import ComponentPreview from './component-preview.vue'
  import TemplateEditor from './template-editor.vue'
  import EditorActions from './editor-actions.vue'
  import ComponentsList from './components-list.vue'

  export default {
    props: ['components', 'currentComponent'],
    components: {
      ComponentPreview,
      TemplateEditor,
      EditorActions,
      ComponentsList
    }
  }
</script>

<style>
  #container {
    height: 100%;
  }

  #container content {
    height: 100%;
    display: flex;
  }

  #container content .slot {
    display: flex;
    flex: 1;
    flex-flow: row wrap;
  }
</style>
