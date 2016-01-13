<template>
    <div class="components-sidebar">
      <h5>components</h5>
      <components-list
          :components="components"
          :current-component="currentComponent"></components-list>
    </div>
    <div class="slot component-definition">
      <component-dependencies :component="currentComponent" :components="components"></component-dependencies>
      <component-properties :component="currentComponent"></component-properties>
      <component-actions :component="currentComponent"></component-actions>
      <hr class="seperator" />
      <template-editor :current-component="currentComponent"></template-editor>
      <hr class="seperator" />
      <style-editor :current-component="currentComponent"></style-editor>
    </div>
    <component-preview-editor :component="currentComponent" class="slot"></component-preview-editor>
</template>

<script>
  import TemplateEditor from './template-editor.vue'
  import EditorActions from './editor-actions.vue'
  import ComponentsList from './components-list.vue'
  import ComponentDependencies from './component-dependencies.vue'
  import ComponentProperties from './component-properties.vue'
  import StyleEditor from './style-editor.vue'
  import ComponentPreviewEditor from './component-preview-editor.vue'
  import ComponentActions from './component-actions.vue'

  export default {
    props: ['components', 'currentComponent'],
    components: {
      ComponentActions,
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
  components-editor {
    display: flex;
    flex-flow: row;

    .slot {
      flex: 1;
    }

    .component-definition {
      display: flex;
      flex-flow: column;
      padding-left: 15px;

      template-editor {
        padding-bottom: 10px;
      }

      .seperator {
        margin: 25px auto;
        width: 50%;
        height: 1px;
        border: 0;
        background: black;
        background: -webkit-gradient(linear, 0 0, 100% 0, from(white), to(white), color-stop(50%, black));
      }

      style-editor {
        margin-top:5px;
        flex: 2;
      }
    }
  }
</style>
