<template>
  <h1>Create your first component</h1>
  <form @submit="createComponent()">
    <input type="text" v-model="newComponentName">
    <button type="submit">Create</button>
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
        this.$data.newComponentName = ''
        return false
      }
    }
  }
</script>
