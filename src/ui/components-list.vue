<template>
  <ul>
    <li v-for="component in components"
        :class="{ 'active' : component.name === currentComponent.name }"
        role="presentation"
        @click="action('setCurrentComponent', component.name)">
      {{ component.name }}
      <span v-show="!component.isSaved">*</span>
    </li>
    <li data-toggle="modal" data-target="#open-create-component-modal">
      <a>+</a>
    </li>
    <li>
      <a v-show="!currentComponent.isSaved" transition="bounce" @click="action('saveCurrentComponent')">
        <span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>
      </a>
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
    ul {
      margin: 0;
      padding: 10px;
      >li {
        list-style: none;
        cursor: pointer;
      }

      >li.active {
        color: maroon;
        font-weight: bold;
       }
    }

    .bounce-enter {
      animation: bounce-in .5s;
    }

    .bounce-leave {
      animation: bounce-out .5s;
    }

    @keyframes bounce-in {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(1.5);
      }
      100% {
        transform: scale(1);
      }
    }

    @keyframes bounce-out {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.5);
      }
      100% {
        transform: scale(0);
      }
    }
  }
</style>
