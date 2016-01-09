<template>
  <ace-editor
      mode="css" theme="chrome" :show-gutter="false" :highlight-active-line="false" :show-print-margin="false"
      :value.sync="currentComponent.style"
      @change="action('setCurrentComponentStyle', currentComponent.style)"></ace-editor>
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
  style-editor {
    display: flex;

    ace-editor {
      flex: 1;
    }
  }
</style>
