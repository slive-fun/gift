<script>
  import Price from './price.svelte'
</script>

<div class="row">
  <div class="column"><Price /></div>
  <div class="column end" />
</div>

<style>
  .column {
    flex-basis: content;
  }
  .end {
    flex-grow: 1;
  }
</style>
