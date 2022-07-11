<script>
  import { filters } from '../stores'
</script>

<div class="price">
  <input
    type="number"
    bind:value={$filters.price.min}
    min="0"
    placeholder="最小价格"
  />
  -
  <input
    type="number"
    bind:value={$filters.price.max}
    min="0"
    placeholder="最大价格"
  />
</div>

<style>
  .price input[type='number'] {
    width: 10rem;
  }
</style>
