<script>
  import { CoinType, CoinTypeText, filters, order } from '../stores'
</script>

<div class="row root">
  <div class="column">
    <input
      type="radio"
      bind:group={$filters.coinType}
      value={null}
      id="coin-type-filter-all"
    />
    <label for="coin-type-filter-all">ALL</label>
  </div>
  <div class="column">
    <input
      type="radio"
      bind:group={$filters.coinType}
      value={CoinType.Gold}
      id="coin-type-filter-cold"
    />
    <label for="coin-type-filter-cold">{CoinTypeText[CoinType.Gold]}</label>
  </div>
  <div class="column">
    <input
      type="radio"
      bind:group={$filters.coinType}
      value={CoinType.Sliver}
      id="coin-type-filter-sliver"
    />
    <label for="coin-type-filter-sliver">{CoinTypeText[CoinType.Sliver]}</label>
  </div>
</div>

<style>
  .root label {
    display: inline-block;
    cursor: pointer;
  }
  .column {
    flex-basis: content;
  }
  .row{
    align-items: center;
  }
</style>
