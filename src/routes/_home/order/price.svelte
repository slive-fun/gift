<script>
  import { order, OrderBy } from '../stores'
</script>

<div class="price row">
  <div class="column">
    <input
      type="radio"
      name="price-order"
      bind:group={$order.price}
      value={OrderBy.None}
      id="price-order-none"
    />
    <label for="price-order-none">不排序</label>
  </div>
  <div class="column">
    <input
      type="radio"
      name="price-order"
      bind:group={$order.price}
      value={OrderBy.LowPrice}
      id="price-order-low"
    />
    <label for="price-order-low">价格升序</label>
  </div>
  <div class="column">
    <input
      type="radio"
      name="price-order"
      bind:group={$order.price}
      value={OrderBy.HighPrice}
      id="price-order-high"
    />
    <label for="price-order-high">价格降序</label>
  </div>
</div>

<style>
  .price label {
    display: inline-block;
  }
  .column {
    flex: 0;
    flex-basis: content;
  }
</style>
