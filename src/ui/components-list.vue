<template>
  <ul class="nav nav-tabs">
    <li v-for="component in components"
        :class="{ 'active' : component.name === currentComponent.name }"
        role="presentation">
      <a @click="action('setCurrentComponent', component.name)">{{ component.name }}</a>
    </li>
    <li data-toggle="modal" data-target="#open-create-component-modal">
      <a>+</a>
    </li>
  </ul>
  <div id="open-create-component-modal" class="modal fade" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <component-creator-dialog></component-creator-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  import ComponentCreatorDialog from './component-creator-dialog.vue'
  import $ from 'jquery'
  export default {
    props: ['components', 'currentComponent'],
    ready () {
      $(this.$el).find('#open-create-component-modal').on('show.bs.modal', function () {
        $(this).css('display', 'flex')
        $(this).find('.modal-dialog').css({width: 'auto'})
      })
    },
    components: {
      ComponentCreatorDialog
    },
    events: {
      'componentCreated': function () {
        $(this.$el).find('#open-create-component-modal').modal('hide')
      }
    }
  }
</script>

<style lang="less">
  components-list {
    .nav-tabs > li.active a, .nav-tabs > li.active a:hover {
      background-color: salmon;
    }
  }
</style>
