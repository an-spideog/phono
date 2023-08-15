<script lang="ts">
    import Hoverable from "./Hoverable.svelte"
    import Icon from "./Icon.svelte"

    export let isOpen: boolean=false;
    export let title: string;
</script>

{#if isOpen}
<div class='z-30 fixed inset-0 flex justify-center items-center bg-black/50'>
    <div class='m-2 p-4 bg-white'>
        <div class='flex justify-between text-2xl pb-2'>
            {title}
            <button on:click={() => isOpen = false}>
                <Hoverable>
                    <Icon name=close/>
                </Hoverable>
            </button>
        </div>
        <slot/>
    </div>
</div>
{/if}