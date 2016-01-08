<template>
  <component-properties-editor :properties="component.properties" :properties-data.sync="propertiesData"></component-properties-editor>
  <component-preview :component="component" :preview-data="propertiesData"></component-preview>
</template>

<script>
  import ComponentPreview from './component-preview.vue'
  import ComponentPropertiesEditor from './component-properties-editor.vue'

  export default {
    props: ['component'],
    components: {
      ComponentPreview,
      ComponentPropertiesEditor
    },
    data () {
      return {
        propertiesData: {}
      }
    },
    watch: {
      component () {
        this.$set('propertiesData', {})
      }
    }
  }
</script>

<style lang="less">
  component-preview-editor {
    display: flex;
    flex-flow: column;

    component-preview {
      flex: 1;
    }
  }
</style>
