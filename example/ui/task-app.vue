<template>
  <task-creator></task-creator>
  <task-list :tasks="tasks"></task-list>
</template>

<script>
  import TaskList from './task-list.vue'
  import TaskCreator from './task-creator.vue'

  export default {
    props: ['tasks'],
    components: {
      TaskCreator,
      TaskList
    }
  }
</script>
