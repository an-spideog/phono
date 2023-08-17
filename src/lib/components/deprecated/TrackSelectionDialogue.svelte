<script lang="ts">
    import type { Track, User } from "$lib/types"
    import Button from "$lib/components/deprecated/Button.svelte";

    export let user: User;
    export let isOpen: boolean=false;
</script>

{#if isOpen}
<div class=modal-container>
    <div class=modal>
        <div class=title-line>
            Roghnaigh traic
            <button on:click={() => isOpen = false}><span class=material-icons>close</span></button>
        </div>

        <form method="POST" action="?/add">
            <input type='text' name='trackIds' placeholder="1, 2">
            <div class=padding/>
            <input type='hidden' name='userId' value={user.ID}>
            <Button type=primary>Cuir leis an úsáideoir</Button>
        </form>
    </div>
</div>
{/if}

<style>
    .padding {
        padding: 10px;
    }

    form {
        display: flex;
        flex-direction: column;
    }
    .results {
        overflow: scroll;
        max-height: 4em;
    }

    * {
        color: var(--on-surface)
    }

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
        padding: 1em;
        background: white;
        border-radius: 8%;
    }

    .title-line {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px var(--on-surface) solid;
        margin-bottom: 2em;
    }

    button {
        background: none;
        border: none;
        cursor: pointer;
    }

    button:hover {
        background: var(--surface-variant);
    }

</style>