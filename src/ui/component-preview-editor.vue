<template>
  <component-properties-editor
      v-ref:properties-editor
      :properties="component.properties"
      :properties-data.sync="propertiesData"></component-properties-editor>
  <component-preview
      :component="component"
      :preview-data="propertiesData"
      @action-invoked="openPropertiesEditor()"></component-preview>
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
    ready () {
      this.setupPropertiesData(this.$data.component.properties)
    },
    watch: {
      component (newVal) {
        this.setupPropertiesData(newVal.properties)
      }
    },
    methods: {
      setupPropertiesData (properties) {
        let data = {}
        properties.forEach((prop) => {
          data[prop] = null
        })
        this.$data.propertiesData = data
      },
      openPropertiesEditor () {
        this.$refs.propertiesEditor.open()
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
