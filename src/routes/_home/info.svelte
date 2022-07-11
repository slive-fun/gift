<script>
  import { room, displayGifts, giftConfig } from './stores'
  $: roomF = $room.result !== null
  $: packageName = $room.room ?? 'gifts-img'
  import { createZip } from './download'
</script>

<div class="row r">
  <div class="column">
    {#if roomF}
      展示/总: {$displayGifts.length}/{$room.result?.length}
      (不包含宝盒爆出的礼物)
    {:else}
      展示/总: {$displayGifts.length}/{$giftConfig.gifts.length}
    {/if}
  </div>
  <div class="column pack">
    <button on:click={() => createZip($displayGifts, packageName)}>
      打包下载
    </button>
  </div>
</div>

<style>
  .r {
    align-items: center;
  }
  .pack {
    text-align: right;
  }
</style>
