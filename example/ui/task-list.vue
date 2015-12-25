<template>
  <p>tasks</p>
  <ul>
    <task v-for="task in tasks" :task="task"></task>
  </ul>
</template>

<script>
import Task from './task.vue'

export default {
  props: ['tasks'],
  components: {Task}
}
</script>
