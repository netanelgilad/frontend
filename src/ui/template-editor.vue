<template>
  <div id="editor">
  </div>
</template>

<script>
  import ace from 'brace'
  import 'brace/mode/html'
  import 'brace/theme/cobalt'

  export default {
    ready () {
      let editor = ace.edit('editor')
      editor.getSession().setMode('ace/mode/html')
      editor.setTheme('ace/theme/cobalt')
    }
  }
</script>

<style>
#editor {
  display: flex;
  flex: 1;
}
</style>
