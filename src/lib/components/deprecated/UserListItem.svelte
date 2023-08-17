<script lang="ts">
  import type { User } from "$lib/types"
  import { _ } from "svelte-i18n";

  export let user: User
</script>

<li class='mb-1'>
  <a href='admin/{user.ID}' class='hover:bg-gray-100 rounded'>
        <div class='flex w-full justify-between p-5 items-center'>
          <div class='flex-col justify-start w-fit'>
            <div class='font-bold text-black'>
              {user.Email}
            </div>
            <div class='text-gray-500'>
              {user.IsAdmin ? $_('admin') : $_('user')}
            </div>
          </div>
          <div class='flex-col  w-fit'>
            {#if user.IsAdmin}
              {$_('allTracks')}
            {:else if !user.TrackCount}
              {$_('noTracks')}
            {:else}
            {user.TrackCount} {$_('trackCounter')}
            {/if}
          </div>
 
        </div>
    </a>
</li>
