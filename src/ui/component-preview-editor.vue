<template>
  <component-preview
      :component="component"
      :preview-data="propertiesData"
      @action-invoked="openPropertiesEditor()"></component-preview>
  <div>
    <component-properties-editor
        v-ref:properties-editor
        :properties="component.properties"
        :properties-data.sync="propertiesData"></component-properties-editor>
    <scenarios-editor></scenarios-editor>
  </div>
</template>

<script>
  import ComponentPreview from './component-preview.vue'
  import ComponentPropertiesEditor from './component-properties-editor.vue'
  import ScenariosEditor from './scenarios-editor.vue'

  export default {
    props: ['component'],
    components: {
      ComponentPreview,
      ComponentPropertiesEditor,
      ScenariosEditor
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

    >* {
      flex: 1;
    }

    component-preview {
      flex: 1;
      margin: 5px;
      -webkit-box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.37);
      -moz-box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.37);
      box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.37);
      border: 1px solid #8e8e8e;
    }
  }
</style>
