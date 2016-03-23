<template>
  <component-preview
      :component="component"
      :preview-data="propertiesData"
      @action-invoked="openPropertiesEditor()">
  </component-preview>
  <div class="preview-editing">
    <component-properties-editor
        v-ref:properties-editor
        :properties="component.properties"
        :properties-data.sync="propertiesData">
    </component-properties-editor>
    <scenarios-editor
        :component="component"
        :current-running-scenario="currentRunningScenario"
        :properties-data.sync="propertiesData">
    </scenarios-editor>
  </div>
</template>

<script>
  import * as ComponentPreview from './component-preview.vue'
  import * as ComponentPropertiesEditor from './component-properties-editor.vue'
  import * as ScenariosEditor from './scenarios-editor.vue'

  export default {
    props: ['component', 'currentRunningScenario'],
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
      this.setupPropertiesData(this.component.properties)
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
        this.propertiesData = data
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

    .preview-editing {
      display: flex;
      flex-flow: column;

      >scenarios-editor {
        flex: 1;
      }
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
