<script>
  import Vue from 'vue'
  Vue.directive('clear-on-input', {
    bind: function () {
      this.el.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) {
          this.el.value = ''
        }
      })
    }
  })
</script>
