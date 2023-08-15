<script lang="ts">
    import type { Reel } from "$lib/types"
    import { clickOutside } from "$lib/actions";
    import Hoverable from "./Hoverable.svelte"

    export let options: Reel[];
    let filterText = "";
    let isPopupOpen = false;
    export let placeholder: string; 
    export let name: string;
</script>

<!--TODO: clicking on elements doesn't work-->
<div class=popup-container use:clickOutside on:click_outside={() => isPopupOpen = false}>
    <input {name} id={name}
            autocomplete="off"
            {placeholder} on:click|stopPropagation bind:value={filterText} 
            on:focus={() => {
                isPopupOpen = true 
                filterText=""
            }}>
    {#if isPopupOpen}
    <div class=results>
        <ul>
            {#each options as option}
                {#if option.Title?.toLowerCase().includes(filterText.toLowerCase())}
                <li class=option>
                        <button class=option on:click|stopPropagation={() => {
                            filterText = String(option.ID);
                            isPopupOpen = false;
                        }}>
                        <Hoverable>
                            <div class=content>
                                {option.Title}
                            </div>
                        </Hoverable>
                        </button>
                </li>
                {/if}
            {/each}
        </ul>
    </div>
    {/if}
</div>

<style>
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .content {
        padding: 0.5em;
    }

    button {
        height: 100%;
        width: 100%;
    }
    input {
        border: 1px var(--on-surface) solid;
        max-width: 100%;
        box-sizing: border-box;
        min-width: 100%;
    }
    .popup-container {
        position: relative;
        width: auto;
    }

    .results {
        background: var(--surface);
        border: 1px var(--on-surface) solid;
        position: absolute;
        z-index: 5;
        max-height: 8em;
        overflow: scroll;
        box-sizing: border-box;
        top: 100%;
        left: 0;
        width: 100%;
    }
</style>

