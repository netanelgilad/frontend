<template>
 <ul>
   <li>Dependencies:</li>
   <li v-for="dependency in component.dependencies" class="dependency">
     {{ dependency }}
   </li>
   <li>
     <select v-model="selectedDependency" class="available-dependencies">
       <option :value="-1"></option>
       <option v-for="component in availableDependencies" :value="component">
         {{component}}
       </option>
     </select>
     <button class="btn btn-default"
             @click="action('addDependencyToCurrentComponent', selectedDependency)"
             :disabled="selectedDependency===-1">
       add
     </button>
   </li>
 </ul>
</template>

<script>
  import _ from 'underscore'

  export default {
    props: ['component', 'components'],
    data () {
      return {
        selectedDependency: -1
      }
    },
    computed: {
      availableDependencies: function () {
        return _.chain(this.$data.components)
            .pluck('name')
            .difference(this.$data.component.dependencies)
            .without(this.$data.component.name)
            .value()
      }
    }
  }
</script>

<style lang="less">
  component-dependencies {
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
