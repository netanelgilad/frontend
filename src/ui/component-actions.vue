<template>
  <ul>
    <li>actions:</li>
    <li v-for="action in component.actions" class="action">
      {{ action }}
    </li>
    <li>
      <input type="text" v-model="newAction" placeholder="Action name" />
      <button @click="action('addActionToCurrentComponent', newAction)" :disabled="newAction===''">
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
        newAction: ''
      }
    }
  }
</script>

<style lang="less">
  component-actions {
    ul {
      margin: 0;
      padding: 0;

      >li {
        display: inline;
        list-style: none;
      }
    }
  }
</style>
