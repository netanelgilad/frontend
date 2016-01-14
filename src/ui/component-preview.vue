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
  import less from 'less/lib/less'

  export default {
    props: {
      component: {
        required: true,
        type: Object
      },
      previewData: {
        required: true,
        type: Object
      }
    },
    ready () {
      this.updatePreview(this.$data.component)
    },
    watch: {
      component: { handler: function (newVal) {
        this.updatePreview(newVal)
      }, deep: true},
      previewData: { handler: function () {
        this.updatePreview(this.$data.component)
      }, deep: true}
    },
    methods: {
      updatePreview (component) {
        let style
        less().render(component.getComputedStyle(), (err, output) => {
          if (!err) {
            style = output.css
          }
        })

        // create the iframe and attach it to the document
        let iframe = document.createElement('iframe')
        iframe.setAttribute('scrolling', 'no')
        iframe.setAttribute('frameborder', '0')

        $(this.$el).find('#iframe-container').empty().append(iframe)
        $('#iframe-container').off('actionInvoked').on('actionInvoked', () => {
          this.$emit('action-invoked')
        })

        let iDoc = iframe.contentDocument
        iDoc.open()
        iDoc.write(template(previewTemplate)({
          name: component.name,
          comp: JSON.stringify(component.getComponentDefinition(), 2),
          style: style,
          properties: this.buildPropertiesString(component.properties),
          data: 'data: ' + JSON.stringify(this.$data.previewData),
          actions: JSON.stringify(component.actions)
        }))
        iDoc.close()
      },
      buildPropertiesString (properties) {
        return properties.reduce((propsString, prop) => {
          return propsString + ':' + prop + '="' + prop + '" '
        }, '')
      }
    }
  }
</script>

<style lang="less">
  component-preview {
    display: flex;
    #iframe-container {
      display: flex;
      flex: 1;
      >iframe {
        flex: 1;
      }
    }
  }
</style>
