<template>
  <div id="container">
    <template v-if="components.length > 0">
      <header class="top-bar">
        <editor-actions></editor-actions>
      </header>
      <content>
        <components-list :components="components" :current-component="currentComponent"></components-list>
        <template-editor :current-component="currentComponent" class="slot"></template-editor>
        <component-preview :current-component="currentComponent" class="slot"></component-preview>
      </content>
    </template>
    <template v-else>
      <component-creator-dialog></component-creator-dialog>
    </template>
  </div>
</template>

<script>
  import ComponentPreview from './component-preview.vue'
  import TemplateEditor from './template-editor.vue'
  import EditorActions from './editor-actions.vue'
  import ComponentsList from './components-list.vue'
  import ComponentCreatorDialog from './component-creator-dialog.vue'

  export default {
    props: ['components', 'currentComponent'],
    components: {
      ComponentPreview,
      TemplateEditor,
      EditorActions,
      ComponentsList,
      ComponentCreatorDialog
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
