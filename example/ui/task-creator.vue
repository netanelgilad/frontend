<template>
  <input id="title" v-model="title" type="text" @keyup.enter="addTask(title)" />
</template>

<script>
  import Action from '../action'

  export default {
    methods: {
      addTask (title) {
        Action('addTask')({ title })
      }
    }
  }
</script>
