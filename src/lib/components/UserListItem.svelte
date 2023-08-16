<script lang="ts">
  import type { User } from "$lib/types"
  import Hoverable from "./Hoverable.svelte";
  import VStack from "./VStack.svelte";
  import HStack from "./HStack.svelte";
  import { _ } from "svelte-i18n";

  export let user: User
</script>

<li>
  <a href='admin/{user.ID}'>
    <Hoverable --hover-color='var(--on-surface)' enabled={true}>
        <HStack --h-stack-width=100% --h-stack-justify-content=space-between --h-stack-padding='20px'>
          <VStack --justify-content=start --width=fit-content>
            <span class=email>
              {user.Email}
            </span>
            <span class=role>
              {user.IsAdmin ? $_('admin') : $_('user')}
            </span>
          </VStack>

          <VStack --width=fit-content>
            {#if user.IsAdmin}
              {$_('allTracks')}
            {:else if !user.TrackCount}
              {$_('noTracks')}
            {:else}
            {user.TrackCount} {$_('trackCounter')}
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
    width: 100%;
    display: block;
    box-sizing: border-box;
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