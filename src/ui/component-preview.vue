<template>
  <div id="iframe-container">
  </div>
</template>

<script>
  import $ from 'jquery'
  import { template } from 'underscore'
  import previewTemplate from 'raw!./component-preview-template.html'

  export default {
    props: ['currentComponent'],
    watch: {
      currentComponent: { handler: function (newVal) {
        // create the iframe and attach it to the document
        var iframe = document.createElement('iframe')
        iframe.setAttribute('scrolling', 'no')
        iframe.setAttribute('frameborder', '0')

        $(this.$el).find('#iframe-container').empty().append(iframe)

        let iDoc = iframe.contentDocument
        iDoc.open()
        iDoc.write(template(previewTemplate)({name: newVal.name, comp: JSON.stringify(newVal.getComponentDefinition())}))
        iDoc.close()
      }, deep: true}
    }
  }
</script>
