<script>
  import ImageList from './image-list.svelte'
  import Filter from './filter/index.svelte'
  import Order from './order/index.svelte'
  import { displayGifts, giftConfig } from './stores'
</script>

<div class="container">
  <div class="row filter item">
    <div class="column b">过滤</div>
    <div class="column c"><Filter /></div>
  </div>
  <div class="row order item">
    <div class="column b">排序</div>
    <div class="column c"><Order /></div>
  </div>
  <div class="row info">
    <div class="column">
      展示/总: {$displayGifts.length}/{$giftConfig.gifts.length}
    </div>
  </div>
  <div class="imgs">
    <ImageList />
  </div>
</div>

<style>
  .container {
    vertical-align: middle;
  }
  .filter {
    position: sticky;
  }
  .item {
    align-items: center;
    padding: 0.5rem 0;
  }
  .item .b {
    flex-basis: content;
    white-space: nowrap;
  }
  .info {
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }
</style>
