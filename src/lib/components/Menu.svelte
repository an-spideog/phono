<script lang="ts">
  import { enhance } from "$app/forms"
  import { clickOutside } from "$lib/actions"
  import type { Track, User } from "$lib/types"

    let isOpen = false;
    export let track: Track;
    export let user: User;
    export let isExpired: boolean;
    console.log('is expired: ' + isExpired)
</script>

<div class=menu id=l2 use:clickOutside on:click_outside={() => {isOpen = false}}>
    <div class=menu-switch>
        <!--Stop propogation here ensures that if the button is clicked, 
            the click doesn't also get applied to the window-->
        <button on:click|stopPropagation={() => isOpen = !isOpen}>
        <span class="material-icons">
            more_horiz
        </span>
        </button>
    </div>
    {#if isOpen}
    <div class=menu-body>
        <div class=vstack>
            <form method="POST" use:enhance action="?/renew">
                <input type='hidden' name='trackId' value={track.ID}>
                <input type='hidden' name='userId' value={user.ID}>
                <button class=option>Renew</button>
            </form>
            {#if !isExpired}
            <form method="POST" use:enhance action="?/remove">
                <button class=option>X Revoke permission now</button>
                <input type='hidden' name='trackId' value={track.ID}>
                <input type='hidden' name='userId' value={user.ID}>
            </form>
            {/if}

        </div>
    </div>
    {/if}
</div>

<style>
    .vstack {
        display: flex;
        flex-direction: column;
    }
    .menu {
        display: inline-block;
        position: relative;
    }
    span:hover {
        background: var(--surface-variant);
        cursor: pointer;
    }
    button {
        background: none;
        border: none;
    }
    .menu-body {
        position: absolute;
        background: var(--surface-variant);
        top: 2em;
        left: -100%;
        z-index: 300;
    }
    .option {
        padding: 1em;
    }
    .option:hover {
        background-color: var(--primary-container);
    }
form {
    display: flex;
    flex-direction: column;
}
</style>