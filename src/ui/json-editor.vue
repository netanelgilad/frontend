<template>
  <ace-editor mode="json" theme="chrome" :value.sync="jsonString"></ace-editor>
</template>

<script>
  import AceEditor from './ace-editor.vue'
  export default {
    props: ['json'],
    data () {
      return {
        jsonString: ''
      }
    },
    ready () {
      this.updateJSONString(this.$data.json)
    },
    watch: {
      json (newValue) {
        if (!this.jsonStringUpdating) {
          this.updateJSONString(newValue)
        } else {
          this.jsonStringUpdating = false
        }
      },
      jsonString (newValue) {
        if (!this.jsonUpdating) {
          try {
            this.$data.json = JSON.parse(newValue)
          } catch (e) {
            this.$data.json = newValue
          }
          this.jsonStringUpdating = true
        } else {
          this.jsonUpdating = false
        }
      }
    },
    methods: {
      updateJSONString (json) {
        this.$data.jsonString = JSON.stringify(json, null, 2)
        this.jsonUpdating = true
      }
    },
    components: {
      AceEditor
    }
  }
</script>

<style lang="less">
  json-editor {
    display: flex;
    height: 500px;

    >ace-editor {
      flex: 1;
    }
  }
</style>
