<template>
  <ul>
    <li v-for="component in components"
        :class="{ 'current' : component.name === currentComponent.name }"
        @click="action('setCurrentComponent', component.name)">
      {{ component.name }}
    </li>
  </ul>
</template>

<script>
  export default {
    props: ['components', 'currentComponent']
  }
</script>

<style>
  .current {
    background: tomato;
  }
</style>
