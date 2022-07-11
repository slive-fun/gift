<script lang="ts">
  import { filters } from '../stores'
</script>

<input
  type="text"
  bind:value={$filters.keywords}
  placeholder="直接输入文字过滤礼物"
/>
