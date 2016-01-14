<template>
  <button class="property-data btn btn-raised btn-primary"
          data-toggle="modal" data-target="#data-editor-modal">Set Component State</button>
  <div class="modal fade" id="data-editor-modal" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <json-editor :json.sync="propertiesData"></json-editor>
      </div>
    </div>
  </div>
</template>

<script>
  import JsonEditor from './json-editor.vue'
  import $ from 'jquery'

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
    methods: {
      open () {
        $(this.$el).find('#data-editor-modal').modal('show')
      }
    },
    components: {
      JsonEditor
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
