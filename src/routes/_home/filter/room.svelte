<script lang="ts">
  import { room } from '../stores'
  let roomId: string
</script>

<form on:submit|preventDefault={() => room.search(roomId)}>
  <input type="text" bind:value={roomId} placeholder="输入房间号" />
  <button>过滤</button>
</form>

<style>
  input {
    width: 15rem;
  }
  button {
    padding: 0 1rem;
  }
</style>
