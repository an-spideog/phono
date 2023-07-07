<script lang="ts">
  import type { Track, User } from "$lib/types"

    export let user: User;
    export let tracks: Track[];
    export let isOpen: boolean=false;
</script>

{#if isOpen}
<div class=modal-container>
    <div class=modal>
        <div class=title-line>
            <span>Roghnaigh traic</span>
            <button on:click={() => isOpen = false}>X</button>
        </div>
        <form method="POST" action="?/add">
            <input type='hidden' name='userId' value={user.ID}>
            <select name='trackId' id='trackId'>
                <option></option>
                {#each tracks as track}
                    <option value={track.ID}>{track.Nickname}</option>
                {/each}
            </select>
            <button>Cuir leis an úsáideoir</button>
        </form>
    </div>
</div>
{/if}

<style>

    .modal-container {
        z-index: 2;
        position: fixed;
        inset: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .modal {
        padding: 50px;
        background: white;
    }

    .title-line {
        display: flex;
        justify-content: space-between;
    }

</style>