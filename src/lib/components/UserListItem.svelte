<script lang="ts">
  import type { User } from "$lib/types"
  import Hoverable from "./Hoverable.svelte";
  import VStack from "./VStack.svelte";
  import HStack from "./HStack.svelte";

  export let user: User
</script>

<li>
  <a href='admin/{user.ID}'>
    <Hoverable --hover-color='var(--on-surface)' enabled={true}>
        <HStack --padding=20px>
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


        </HStack>
      
          </Hoverable>
        </a>
</li>

<style>
  * {
    color: var(--on-surface-variant);
  }
  li {
    list-style: none;
    margin-bottom: 2px;
  }
  /*li:hover {
    background: var(--surface-variant);
  }*/
  a, a:visited, a:hover {
    text-decoration: none;
    color: var(--on-surface-variant);
  }
  .content {
    display: flex;
    justify-content: space-between;
    text-decoration: none;
    color: var(--on-surface-variant);
    padding: 20px;
  }
  a:hover {
    text-decoration: none;
  }

  .email {
    font-weight: bold;
    color: var(--on-surface);
  }
</style>