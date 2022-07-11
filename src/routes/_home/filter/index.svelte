<script lang="ts">
  import Search from './search.svelte'
  import Coin from './coin.svelte'
  import Price from './price.svelte'
</script>

<div class="row">
  <div class="column c"><Coin /></div>
  <div class="column p"><Price /></div>
  <div class="column s"><Search /></div>
</div>

<style>
  .row {
    align-items: center;
    white-space: nowrap;
  }
  .c,
  .p {
    flex-basis: content;
  }
  .s {
    flex-grow: 1;
  }
</style>
