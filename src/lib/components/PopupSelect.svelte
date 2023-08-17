<script lang="ts">
    import type { Reel } from "$lib/types"
    import { clickOutside } from "$lib/actions";

    export let options: Reel[];
    let filterText = "";
    let isPopupOpen = false;
    export let placeholder: string; 
    export let name: string;
</script>


<div class='relative w-auto' use:clickOutside on:click_outside={() => isPopupOpen = false}>
    <input {name} id={name}
            autocomplete="off"
            {placeholder} on:click|stopPropagation bind:value={filterText} 
            on:focus={() => {
                isPopupOpen = true 
                filterText=""
            }}
            class='w-full'>
    {#if isPopupOpen}
    <div class='bg-white border-black border absolute z-10 max-h-40 
        overflow-scroll top-full w-full left-0'>
        <ul>
            {#each options as option}
                {#if option.Title?.toLowerCase().includes(filterText.toLowerCase())}
                <li class=option>
                    <button class='w-full h-full p-1 hover:bg-gray-100' on:click|stopPropagation={() => {
                        filterText = String(option.ID);
                        isPopupOpen = false;
                    }}>
                        {option.Title}
                    </button>
                </li>
                {/if}
            {/each}
        </ul>
    </div>
    {/if}
</div>