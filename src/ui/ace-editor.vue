<script>
  import ace from 'brace'
  import 'brace/mode/html'
  import 'brace/theme/cobalt'

  export default {
    props: {
      mode: String,
      theme: String,
      value: {
        type: String,
        twoWay: true
      }
    },
    ready () {
      this.editor = ace.edit(this.$el)
      this.editor.getSession().setMode(`ace/mode/${this.$data.mode}`)
      this.editor.setTheme(`ace/theme/${this.$data.theme}`)
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
          this.$emit('change', this.editor.getValue())
        })
      }
    }
  }
</script>
