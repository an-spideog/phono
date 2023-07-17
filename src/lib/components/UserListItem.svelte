<script lang="ts">
  import type { User } from "$lib/types"
  import TrackListItem from "./TrackListItem.svelte"
  import VStack from "./VStack.svelte";

  export let user: User
</script>

<li>
  <a href='admin/{user.ID}'>
      <VStack>
        <span class=email>
          {user.Email}
        </span>
        <span class=role>
          {user.IsAdmin ? 'Riarthóir' : 'Úsáideoir'}
        </span>
      </VStack>

      <VStack>
        {#if user.IsAdmin}
          gach traic
        {:else if !user.TrackCount}
          gan aon traic
        {:else}
        {user.TrackCount} traic
        {/if}
      </VStack>
  </a>
</li>

<style>
  * {
    color: var(--on-surface-variant);
  }
  li {
    padding: 20px;
    list-style: none;
    margin-bottom: 2px;
  }
  li:hover {
    background: var(--surface-variant);
  }
  a, a:visited, a:hover {
    display: flex;
    justify-content: space-between;
    text-decoration: none;
    color: var(--on-surface-variant);
  }
  a:hover {
    text-decoration: none;
  }

  .email {
    font-weight: bold;
    color: var(--on-surface);
  }
</style>