<template>
  <ul>
    <li v-for="component in components" :class="{ 'current' : component.name === currentComponent }">
      {{ component.name }}
    </li>
  </ul>
</template>

<script>
  export default {
    props: ['components', 'currentComponent'],
    ready () {
      console.log(this.$data)
    }
  }
</script>

<style>
  .current {
    background: tomato;
  }
</style>
