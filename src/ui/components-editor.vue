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
        <component-properties :component="currentComponent"></component-properties>
        <template-editor :current-component="currentComponent"></template-editor>
        <style-editor :current-component="currentComponent"></style-editor>
      </div>
      <component-preview-editor :component="currentComponent" class="slot"></component-preview-editor>
    </content>
  </div>
</template>

<script>
  import TemplateEditor from './template-editor.vue'
  import EditorActions from './editor-actions.vue'
  import ComponentsList from './components-list.vue'
  import ComponentDependencies from './component-dependencies.vue'
  import ComponentProperties from './component-properties.vue'
  import StyleEditor from './style-editor.vue'
  import ComponentPreviewEditor from './component-preview-editor.vue'

  export default {
    props: ['components', 'currentComponent'],
    components: {
      ComponentPreviewEditor,
      TemplateEditor,
      EditorActions,
      ComponentsList,
      ComponentDependencies,
      ComponentProperties,
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
        flex: 1;
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
