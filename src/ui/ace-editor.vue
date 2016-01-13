<script>
  import ace from 'brace'
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

      if (this.$data.fitToContent) {
        this.editor.setOptions({
          maxLines: Infinity
        })
      }

      this.editor.getSession().setMode(`ace/mode/${this.$data.mode}`)
      this.editor.setTheme(`ace/theme/${this.$data.theme}`)
      this.editor.renderer.setShowGutter(this.$data.showGutter)
      this.editor.setHighlightActiveLine(this.$data.highlightActiveLine)
      this.editor.setShowPrintMargin(this.$data.showPrintMargin)
      this.editor.$blockScrolling = Infinity
      this.editor.setValue(this.$data.value || '', -1)
      this.UPDATING_VALUE = false

      this.listenOnChange()
    },
    watch: {
      value: function () {
        if (!this.UPDATING_VALUE) {
          this.editor.removeAllListeners('change')
          this.editor.setValue(this.$data.value || '', -1)
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
          this.$data.value = this.editor.getValue()
          this.$dispatch('change', this.editor.getValue())
        })
      }
    }
  }
</script>
