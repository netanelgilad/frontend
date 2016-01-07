<template>
  <ul>
    <li>Properties</li>
    <li v-for="property in properties">
      <button class="property-data"
              data-toggle="modal" data-target="#data-editor-modal"
              @click="setCurrentProperty(property)">{{property}}</button>
    </li>
  </ul>
  <div class="modal fade" id="data-editor-modal" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <json-editor :json.sync="currentPropertyData" @input="setCurrentPropertyData(currentPropertyData)"></json-editor>
      </div>
    </div>
  </div>
</template>

<script>
  import JsonEditor from './json-editor.vue'

  export default {
    props: {
      properties: {
        required: true,
        type: Array,
        oneWay: true
      },
      propertiesData: {
        required: true,
        type: Object,
        twoWay: true
      }
    },
    data () {
      return {
        currentPropertyData: ''
      }
    },
    components: {
      JsonEditor
    },
    methods: {
      setCurrentProperty (prop) {
        this.currentProperty = prop
        this.currentPropertyData = this.$data.propertiesData[prop]
      },
      setCurrentPropertyData (dataAsString) {
        let data
        try {
          data = JSON.parse(dataAsString)
        } catch (e) {
          data = dataAsString
        }
        this.$set(`propertiesData.${this.currentProperty}`, data)
      }
    }
  }
</script>

<style lang="less">
  component-properties-editor {
    ul {
      margin: 0;
      padding: 0;
      >li {
        display: inline;
        list-style: none;
      }
    }
  }
</style>
