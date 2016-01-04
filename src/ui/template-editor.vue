<template>
  <ace-editor
      mode="html" theme="cobalt"
      :value.sync="currentComponent.template"
      @change="action('setCurrentComponentTemplate', currentComponent.template)"></ace-editor>
</template>

<script>
  import AceEditor from './ace-editor.vue'

  export default {
    props: ['currentComponent'],
    components: {
      AceEditor
    }
  }
</script>

<style lang="less">
  template-editor {
    display: flex;

    ace-editor {
      flex: 1;
    }
  }
</style>
