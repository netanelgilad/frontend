<template>
  <div id="iframe-container">
    <iframe>
    </iframe>
  </div>
</template>

<script>
  import $ from 'jquery'
  import { template } from 'underscore'
  import previewTemplate from '../assets/component-preview-template'

  export default {
    props: ['currentComponent'],
    ready () {
      this.updatePreview(this.$data.currentComponent)
    },
    watch: {
      currentComponent: { handler: function (newVal) {
        this.updatePreview(newVal)
      }, deep: true}
    },
    methods: {
      updatePreview (component) {
        // create the iframe and attach it to the document
        var iframe = document.createElement('iframe')
        iframe.setAttribute('scrolling', 'no')
        iframe.setAttribute('frameborder', '0')

        $(this.$el).find('#iframe-container').empty().append(iframe)

        let iDoc = iframe.contentDocument
        iDoc.open()
        iDoc.write(template(previewTemplate)({name: component.name, comp: JSON.stringify(component.getComponentDefinition())}))
        iDoc.close()
      }
    }
  }
</script>
