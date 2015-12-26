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

      this.editor.on('input', () => {
        Action('setComponentTemplate')(this.$data.currentComponent.name, this.editor.getValue())
      })
    },
    watch: {
      currentComponent (val, oldVal) {
        this.editor.setValue(val.template || '', -1)
      }
    }
  }
</script>

<style>
#editor {
  display: flex;
  flex: 1;
}
</style>
