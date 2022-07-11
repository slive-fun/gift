<script>
  import { room, displayGifts, giftConfig } from './stores'
  $: roomF = $room.result !== null
</script>

<div class="row info">
  <div class="column">
    {#if roomF}
      展示/总: {$displayGifts.length}/{$room.result?.length}
      (不包含宝盒爆出的礼物)
    {:else}
      展示/总: {$displayGifts.length}/{$giftConfig.gifts.length}
    {/if}
  </div>
</div>

<style>
  .hetip {
    text-align: right;
  }
  .hetip.hidden {
    visibility: hidden;
  }
</style>
