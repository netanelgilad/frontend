<script>
  import * as ace from 'brace'
  import 'brace/mode/html'
  import 'brace/theme/cobalt'
  import 'brace/theme/chrome'
  import 'brace/mode/json'

  export default {
    props: {
      mode: String,
      theme: String,
      showGutter: {
        type: Boolean,
        default: true
      },
      highlightActiveLine: {
        type: Boolean,
        default: true
      },
      showPrintMargin: {
        type: Boolean,
        default: true
      },
      fitToContent: {
        type: Boolean,
        default: false
      },
      value: {
        type: String,
        twoWay: true
      }
    },
    ready () {
      this.editor = ace.edit(this.$el)

      if (this.fitToContent) {
        this.editor.setOptions({
          maxLines: Infinity
        })
      }

      this.editor.getSession().setMode(`ace/mode/${this.mode}`)
      this.editor.setTheme(`ace/theme/${this.theme}`)
      this.editor.renderer.setShowGutter(this.showGutter)
      this.editor.setHighlightActiveLine(this.highlightActiveLine)
      this.editor.setShowPrintMargin(this.showPrintMargin)
      this.editor.$blockScrolling = Infinity
      this.editor.setValue(this.value || '', -1)
      this.UPDATING_VALUE = false

      this.listenOnChange()
    },
    watch: {
      value: function () {
        if (!this.UPDATING_VALUE) {
          this.editor.removeAllListeners('change')
          this.editor.setValue(this.value || '', -1)
          this.listenOnChange()
        } else {
          this.UPDATING_VALUE = false
        }
      }
    },
    methods: {
      listenOnChange () {
        this.editor.on('change', () => {
          this.UPDATING_VALUE = true
          this.value = this.editor.getValue()
          this.$dispatch('change', this.editor.getValue())
        })
      }
    }
  }
</script>
