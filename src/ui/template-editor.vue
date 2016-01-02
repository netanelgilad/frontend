<template>
  <div id="editor">
  </div>
</template>

<script>
  import ace from 'brace'
  import 'brace/mode/html'
  import 'brace/theme/cobalt'
  import Action from '../action'

  export default {
    props: ['currentComponent'],
    ready () {
      this.editor = ace.edit('editor')
      this.editor.getSession().setMode('ace/mode/html')
      this.editor.setTheme('ace/theme/cobalt')
      this.editor.$blockScrolling = Infinity
      this.editor.setValue(this.$data.currentComponent.template || '', -1)

      this.listenOnInput()
    },
    watch: {
      currentComponent (val) {
        this.editor.removeAllListeners('change')
        this.editor.setValue(val.template || '', -1)
        this.listenOnInput()
      }
    },
    methods: {
      listenOnInput () {
        this.editor.on('change', () => {
          Action('setCurrentComponentTemplate')(this.editor.getValue())
        })
      }
    }
  }
</script>

<style lang="less">
  template-editor {
    display: flex;

    #editor {
      flex: 1;
    }
  }
</style>
