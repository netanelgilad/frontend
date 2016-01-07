<template>
  <ul>
    <li>properties:</li>
    <li v-for="property in component.properties" class="property">
      {{ property }}
    </li>
    <li>
      <input type="text" v-model="newProperty" placeholder="Property name" />
      <button @click="action('addPropertyToCurrentComponent', newProperty)" :disabled="newProperty===''">
        Add
      </button>
    </li>
  </ul>
</template>

<script>
  export default {
    props: ['component'],
    data () {
      return {
        newProperty: ''
      }
    }
  }
</script>

<style lang="less">
  component-properties {
    ul {
      margin: 0;
      padding: 0;

      >li {
        display: inline;
        list-style: none;
      }

      #newDependencyName {
        width: 200px;
        display: inline;
      }
    }
  }
</style>
