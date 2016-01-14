<template>
  <button class="btn btn-raised btn-primary"
          data-toggle="modal"
          data-target="#scenario-editor-modal">
    Create a new scenario
  </button>
  <h3>Current Scenario</h3>
  <ul>
    <li>check</li>
  </ul>
  <div class="modal fade" id="scenario-editor-modal" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <scenario-editor></scenario-editor>
      </div>
    </div>
  </div>
</template>

<script>
  import ScenarioEditor from './scenario-editor.vue'

  export default {
    components: {
      ScenarioEditor
    }
  }
</script>

<style land="less">
</style>