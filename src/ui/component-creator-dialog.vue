<template>
  <form @submit.prevent="createComponent()">
    <div class="panel panel-default">
      <div class="panel-heading">Create a component</div>
      <div class="panel-body">
        <input type="type" v-model="newComponentName" class="form-control"
               placeholder="Component Name">
        <button type="submit" class="btn btn-default">
          Create
        </button>
      </div>
    </div>
  </form>
</template>

<script>
  import Action from '../action'
  export default {
    data () {
      return {
        newComponentName: ''
      }
    },
    methods: {
      createComponent () {
        Action('createNewComponent')(this.$data.newComponentName)
        this.$dispatch('componentCreated')
        return false
      }
    }
  }
</script>

<style lang="less">
  component-creator-dialog {
    display: flex;
    padding: 10px;

    button[type="submit"] {
      margin-top: 10px;
      width: 100%;
    }
  }
</style>
