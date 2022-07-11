<script lang="ts">
  import type { Gift } from '$lib/bili/index'
  import autoAnimate from '@formkit/auto-animate'
  import { CoinType, displayGifts } from './stores'
</script>

<ul use:autoAnimate class="ul row">
  {#each $displayGifts as gift (gift.id)}
    <li class="column column-20 item" data-id={gift.id}>
      <img src={gift.img_basic} alt={gift.name} height="140" width="140" />
      <h6>{gift.name}</h6>
      <span class="price" class:sliver={gift.coin_type === CoinType.Sliver}>
        {gift.price / 1000}
      </span>
    </li>
  {/each}
</ul>

<style>
  .ul {
    flex-wrap: wrap;
  }
  .item {
    position: relative;
    text-align: center;
  }

  .price {
    position: absolute;
    top: 0;
    /* left: 0; */
    background-color: #d0d31a84;
    color: #000;
    padding: 0 1rem;
    line-height: 3rem;
    font-size: 3rem;
  }
  .price.sliver {
    background-color: rgba(144, 145, 111, 0.221);
  }
  .item h6 {
    text-align: center;
  }
</style>
