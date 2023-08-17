<script lang="ts">
    import { enhance } from "$app/forms"
    import { clickOutside } from "$lib/actions"
    import type { Track, User } from "$lib/types"
    import { _ } from "svelte-i18n";
    import Icon from "./Icon.svelte";
    export let track: Track;
    export let user: User;
    export let isExpired: boolean;

    let isOpen = false;
</script>

<div class='inline-block relative' use:clickOutside on:click_outside={() => {isOpen = false}}>
    <!--Stop propogation here ensures that if the button is clicked, 
        the click doesn't also get applied to the window-->
    <button class='hover:bg-gray-100 flex justify-center items-center' on:click|stopPropagation={() => isOpen = !isOpen}>
        <Icon name=more_horiz/>
    </button>
    {#if isOpen}
    <div class='absolute rounded shadow z-10 bg-white top-4 -left-[300%]'>
        <div class=flex-col>
            <form method="POST" use:enhance action="?/renew" class=''>
                <input type='hidden' name='trackId' value={track.ID}>
                <input type='hidden' name='userId' value={user.ID}>
                <button class='hover:bg-gray-100 mx-auto w-full p-2'>{$_('renew')}</button>
            </form>
            {#if !isExpired}
            <form method="POST" use:enhance action="?/remove" class='flex'>
                <input type='hidden' name='trackId' value={track.ID}>
                <input type='hidden' name='userId' value={user.ID}>
                <button class='text-red-800 mx-auto w-full hover:bg-gray-100 p-2'>{$_('revokePermissionNow')}</button>
            </form>
            {/if}

        </div>
    </div>
    {/if}
</div>