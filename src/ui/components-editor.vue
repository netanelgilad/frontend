<template>
  <div id="container">
    <header class="top-bar">
      <components-list
          :components="components"
          :current-component="currentComponent"></components-list>
    </header>
    <content>
      <div class="slot component-definition">
        <component-dependencies :component="currentComponent" :components="components"></component-dependencies>
        <template-editor :current-component="currentComponent"></template-editor>
        <style-editor :current-component="currentComponent"></style-editor>
      </div>
      <component-preview :current-component="currentComponent" class="slot"></component-preview>
    </content>
  </div>
</template>

<script>
  import ComponentPreview from './component-preview.vue'
  import TemplateEditor from './template-editor.vue'
  import EditorActions from './editor-actions.vue'
  import ComponentsList from './components-list.vue'
  import ComponentDependencies from './component-dependencies.vue'
  import StyleEditor from './style-editor.vue'

  export default {
    props: ['components', 'currentComponent'],
    components: {
      ComponentPreview,
      TemplateEditor,
      EditorActions,
      ComponentsList,
      ComponentDependencies,
      StyleEditor
    }
  }
</script>

<style lang="less">
  #container {
    height: 100%;

    content {
      height: 100%;
      display: flex;

      .slot {
        display: flex;
        flex: 1;
        flex-flow: row wrap;
      }

      .component-definition {
        display: flex;
        flex-flow: column;

        template-editor {
          flex: 1;
        }

        style-editor {
          margin-top:5px;
          flex: 1;
        }
      }
    }
  }
</style>
