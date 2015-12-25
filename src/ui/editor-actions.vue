<template>
  <ul class="actions">
    <li @click="action('renderPreview')">Refresh</li> <!-- TODO: need a better way to call actions -->
    <li><input type="text" v-model="newComponentName" /></li>
    <li @click="action('createNewComponent', newComponentName)">Create</li>
  </ul>
</template>

<script>
  export default {
    data () {
      return {
        newComponentName: ''
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
