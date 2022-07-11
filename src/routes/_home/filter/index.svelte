<script lang="ts">
  import Search from './search.svelte'
  import Coin from './coin.svelte'
  import Price from './price.svelte'
  import Room from './room.svelte'
</script>

<div class="row">
  <div class="column c"><Coin /></div>
  <div class="column p"><Price /></div>
  <div class="column s"><Search /></div>
  <div class="column r"><Room /></div>
</div>

<style>
  .row {
    align-items: center;
    white-space: nowrap;
  }
  .column {
    flex-basis: content;
    flex-grow: 0;
  }
  .column.s {
    flex-grow: 1;
  }
</style>
