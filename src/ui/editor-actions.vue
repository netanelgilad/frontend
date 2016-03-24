<template>
  <ul class="actions">
    <li>
      <input type="text" v-model="newComponentName"
             @keyup.enter="createComponent()"/>
    </li>
    <li>
      <button @click="createComponent()">Create</button>
    </li>
  </ul>
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
      // TODO: think of a way that you do not need to write code for this kind of logic
      createComponent () {
        Action('createNewComponent')(this.newComponentName)
        this.newComponentName = ''
      }
    }
  }
</script>

<style>
  .actions {
    list-style-type: none;
  }

  .actions li {
    display: inline;
  }
</style>
